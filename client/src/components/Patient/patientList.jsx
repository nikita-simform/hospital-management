import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Table, Input, Modal, Button, message, Upload, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { apiService } from "../../sevices/apiService";
import {
  DEFALUT_PAGE,
  DEFAULT_PAGE_SIZE,
  direction,
  FilterMinMaxValues,
  getColumns,
} from "./patient.helper";
import {
  setIsDeletePopupOpen,
  setPatientList,
  setTotalPatients,
} from "./PatientSlice";
import { getLocalStorage } from "../../utils/storage";
import { useNavigate } from "react-router";

const { Search } = Input;
function PatientList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let patientList = useSelector((state) => state.patient.patientList);
  const totalPatients = useSelector((state) => state.patient.total);
  const isDeletePopupOpen = useSelector(
    (state) => state.patient.isDeletePopupOpen
  );
  const httpGetAllPatients = (page, limit, sort, direction) => {
    apiService.getAllPatients(page, limit, sort, direction).then((response) => {
      dispatch(setPatientList(response.data.patients));
      dispatch(setTotalPatients(response.data.total));
    });
  };
  useEffect(() => {
    httpGetAllPatients(DEFALUT_PAGE, DEFAULT_PAGE_SIZE);
  }, []);

  // const onPageChange = (pageNumber) => {
  //   httpGetAllPatients(pageNumber, DEFAULT_PAGE_SIZE);
  // };

  const filterPatientsByAge = (minAge, maxAge) => {
    apiService.filterPatient(minAge, maxAge).then((response) => {
      dispatch(setPatientList(response.data.patients));
      dispatch(setTotalPatients(response.data.patients?.length || 0));
    });
  };

  const handleOnChange = (pagination, filters, sorter) => {
    let params = {};
    if (sorter.hasOwnProperty("column")) {
      params.sort = sorter.field;
      params.dir = direction[sorter.order];
    }

    if (filters.age) {
      let min = Math.min.apply(null, filters.age);
      let max = Math.max.apply(null, filters.age);

      let minAge = FilterMinMaxValues[min].min;
      let maxAge = FilterMinMaxValues[max].max;

      filterPatientsByAge(minAge, maxAge);
      return;
    }

    httpGetAllPatients(
      pagination.current,
      pagination.pageSize,
      params.sort,
      params.dir
    );
  };

  const searchPatient = (searchKey) => {
    apiService.searchPatient(searchKey).then((response) => {
      dispatch(setPatientList(response.data.patients));
      dispatch(setTotalPatients(response.data.patients?.length || 0));
    });
  };
  const onSearch = (value) => {
    searchPatient(value);
  };

  const handleDelete = (patientId) => {
    dispatch(setIsDeletePopupOpen(patientId));
  };

  const deletePatient = () => {
    apiService.deletePatient(isDeletePopupOpen).then((response) => {
      let newPatientList=[...patientList]
      let index = newPatientList.indexOf(
        newPatientList.find((patient) => patient._id == isDeletePopupOpen)
      );
       newPatientList.splice(index, 1);
      dispatch(setPatientList(newPatientList));
      dispatch(setIsDeletePopupOpen(null));
    });
  };
  const handleCancel = () => {
    dispatch(setIsDeletePopupOpen(null));
  };
  function onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      httpGetAllPatients(DEFALUT_PAGE, DEFAULT_PAGE_SIZE);

    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
  const token = getLocalStorage("token");

  return (
    <div>
      <h1>Patient List</h1>
      <Space>
        <Button
          onClick={() => {
            navigate("/patient/add");
          }}
        >
          Add Patient
        </Button>
        <Search
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{ width: 200 }}
        />
        <Upload
          name="csvFile"
          action="http://localhost:8000/v1/patients/upload"
          headers={{ authorization: "Bearer " + token }}
          onChange={onChange}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Space>
      <Table
        scroll={{ y: 425 }}
        className="your-table"
        dataSource={patientList}
        columns={getColumns(handleDelete)}
        onChange={handleOnChange}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          position: ["bottomRight"],
          // onChange: onPageChange,
          total: totalPatients,
        }}
      />

      <Modal
        title=""
        open={isDeletePopupOpen}
        onOk={deletePatient}
        onCancel={handleCancel}
      >
        <p>Are you sure you want to delete this patient?</p>
      </Modal>
    </div>
  );
}

PatientList.propTypes = {};

export default PatientList;
