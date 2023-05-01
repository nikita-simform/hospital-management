import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "antd";
import { apiService } from "../../sevices/apiService";
import { DEFAULT_PAGE_SIZE, patientListColoums } from "./patient.helper";
import { setPatientList, setTotalPatients } from "./PatientSlice";

function PatientList(props) {
  const dispatch = useDispatch();
  const patientList = useSelector((state) => state.patient.patientList);
  const totalPatients = useSelector((state) => state.patient.total);

  useEffect(() => {
    apiService.getAllPatients().then((response) => {
      dispatch(setPatientList(response.data.patients));
      dispatch(setTotalPatients(response.data.total));
    });
  }, []);

  const onPageChange = (pageNumber) => {
    console.log(pageNumber);
  };

  return (
    <div>
      <Table
        dataSource={patientList}
        columns={patientListColoums}
        pagination={{
          pageSize: DEFAULT_PAGE_SIZE,
          position: ["bottomRight"],
          onChange: onPageChange,
          total: totalPatients,
        }}
      />
    </div>
  );
}

PatientList.propTypes = {};

export default PatientList;
