import React from "react";
import { Button, Form, Input } from "antd";
import { apiService } from "../../sevices/apiService";
import { useNavigate } from "react-router-dom";
import './signUp.css';

export default function SignUp() {
    let navigate = useNavigate();
  const onFinish = (values) => {
    if(values.password!==values.confirm_password){
      return;
    }
    apiService
      .signup({
        firstName: values.firstName,
        middleName:values.middleName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        navigate("/login");
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="sign-up-container">
    <h1>Sign Up</h1>
    <Form
      name="basic"
      labelCol={{ span: 10}}
      wrapperCol={{ span: 40 }}
      style={{ maxWidth: 1000 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="First Name"
        name="firstName"
        rules={[{ required: true, message: "Please enter your first name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Middle Name"
        name="middleName"
        rules={[{ required: true, message: "Please enter your middle name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Last Name"
        name="lastName"
        rules={[{ required: true, message: "Please enter your last name" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter your email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm_password"
        rules={[{ required: true, message: "Please enter confirm password" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
}
