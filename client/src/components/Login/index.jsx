import { Button, Form, Input } from "antd";
import { apiService } from "../../sevices/apiService";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUser } from "./LoginSlice";
import { useNavigate } from "react-router-dom";

function Login(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onFinish = (values) => {
    apiService
      .login({
        email: values.username,
        password: values.password,
      })
      .then((res) => {
        dispatch(setUser(res.data.user));
        dispatch(setToken(res.data.token));
        navigate("/patient-list");
      });
  };
  const onFinishFailed = (errorInfo) => {};
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

Login.propTypes = {};

export default Login;
