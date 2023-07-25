import React, { useEffect, useState } from "react";
import { Button, Form, Input, InputNumber, Card } from "antd";
import { apiService } from "../../services/apiService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function AddEditPatientDetails() {
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
        setPatientDetail(response.data.data?.result);
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
      apiService.updatePatient(requestBody).then(() => {
        toast.success("Patient details updated successfully");
        navigate("/patient-list");
      });
    } else {
      apiService.savePatient(requestBody).then(() => {
        toast.success("Patient details added successfully");
        navigate("/patient-list");
      });
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const { TextArea } = Input;
  return (
    <Card className="card-container add-edit-patient">
      <h1 className="heading">{params.id ? "Edit Patient" : "Add Patient"}</h1>
      <Form
        name="basic"
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 20,
        }}
        style={{
          width: 700,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item
          name="firstname"
          rules={[
            {
              required: true,
              message: "Please enter first name of patient",
            },
          ]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>
        <Form.Item
          name="middlename"
          rules={[
            {
              required: true,
              message: "Please enter middle name of patient",
            },
          ]}
        >
          <Input placeholder="Enter Middle Name" />
        </Form.Item>
        <Form.Item
          name="lastname"
          rules={[
            {
              required: true,
              message: "Please enter last name of patient",
            },
          ]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[
            {
              required: true,
              message: "Please enter age of patient",
            },
          ]}
        >
          <InputNumber placeholder="Enter Age" />
        </Form.Item>
        <Form.Item name="address">
          <TextArea rows={4} placeholder="Enter Address" />
        </Form.Item>
        <Form.Item
          name="contact_number"
          rules={[
            {
              required: true,
              message: "Please enter contact number of patient",
            },
            {
              type: 'number',
              message: 'Please enter valid contact number'
            },
            {
              min: 10, max: 10,
              message: 'Please enter 10 digit contact number'
            }
          ]}
        >
          <Input placeholder="Enter Contact Number" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter email of patient",
            },
            {
              type: 'email',
              message: 'Please enter valid email',
            },
          ]}
        >
          <Input placeholder="Enter Email" />
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
    </Card>
  );
}
