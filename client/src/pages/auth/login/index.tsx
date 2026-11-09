import { Flex } from "antd";
import LoginImg from "../../../components/loginImage";
import LoginForm from "../../../components/loginForm";

export type LoginFormValues = {
  identifier: string;
  password: string;
};

export default function Login() {
  return (
    <Flex gap={32}>
      <LoginImg size="380" />
      <LoginForm />
    </Flex>
  );
}
