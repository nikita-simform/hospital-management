import { Button, Form, Input, Card } from "antd";
import { apiService } from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignUp() {
  let navigate = useNavigate();
  const onFinish = (values) => {
    if (values.password !== values.confirm_password) {
      return;
    }
    apiService
      .signup({
        firstName: values.firstName,
        middleName: values.middleName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        toast.success(response.data.message);
        navigate("/login");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("errorInfo:",errorInfo)
  };

  return (
    <Card className="card-container sign-up">
      <h1 className="heading">Sign Up</h1>
      <Form
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 40 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Please enter your first name" }]}
        >
          <Input placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item
          name="middleName"
          rules={[{ required: true, message: "Please enter your middle name" }]}
        >
          <Input placeholder="Enter Middle Name" />
        </Form.Item>

        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please enter your last name" }]}
        >
          <Input placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            {
              type: 'email',
              message: 'Please enter valid email',
            },
          ]}
        >
          <Input placeholder="Enter Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password placeholder="Enter Password" />
        </Form.Item>
        <Form.Item
          name="confirm_password"
          rules={[{ required: true, message: "Please enter confirm password" }]}
        >
          <Input.Password placeholder="Enter confirm password" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
