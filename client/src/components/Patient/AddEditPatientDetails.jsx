import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber } from "antd";
import { apiService } from "../../sevices/apiService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";

export default function AddEditPatientDetails(props) {
  const [patientDetail, setPatientDetail] = useState({});
  const params = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  Object.keys(patientDetail).length !== 0 &&
    form.setFieldsValue({
      firstname: patientDetail.firstName,
      middlename: patientDetail.middleName,
      lastname: patientDetail.lastName,
      age: patientDetail.age,
      address: patientDetail.address,
      contact_number: patientDetail.contact_number,
      email: patientDetail.email,
    });

  useEffect(() => {
    if (params.id) {
      apiService.getPatientById(params.id).then((response) => {
        setPatientDetail(response.data);
      });
    }
  }, [params.id]);

  const onFinish = (values) => {
    let requestBody = {
      firstName: values.firstname,
      middleName: values.middlename,
      lastName: values.lastname,
      age: values.age,
      address: values.address,
      contact_number: values.contact_number,
      email: values.email,
    };
    if (params.id) {
      requestBody.id = params.id;
      apiService.updatePatient(requestBody).then((res) => {
        navigate("/patient-list");
      });
    } else {
      apiService.savePatient(requestBody).then((res) => {
        navigate("/patient-list");
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { TextArea } = Input;
  return (
    <div>
      <h1>{params.id ? "Edit Patient" : "Add Patient"}</h1>
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          maxWidth: 1000,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          label="FirstName"
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please enter first name of patient",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="MiddleName"
          name="middlename"
          rules={[
            {
              required: true,
              message: "Please enter middle name of patient",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="LastName"
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please enter last name of patient",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: "Please enter age of patient",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Addres" name="address">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Contact Number"
          name="contact_number"
          rules={[
            {
              required: true,
              message: "Please enter contact number of patient",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email of patient",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
