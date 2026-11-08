import { useForm } from "react-hook-form";
import LoginInputs from "../../../components/loginInputs";
import Logo from "../../../components/logo";
import { AuthContainer } from "../../../styles/common";
import { AuthForm, Card, SmallText, StyledLink } from "../register/styles";
import { Button, Divider, Flex } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import type { ApiError } from "../register";
import styled from "styled-components";
import LoginImg from "../../../components/loginImage";

export type LoginFormValues = {
  identifier: string;
  password: string;
};

const StyledP = styled.p`
  color: var(--gray-text);
`;

export default function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const navigate = useNavigate();

  async function submit(data: LoginFormValues) {
    try {
      const response = await axios.post(
        "http://localhost:3333/auth/login",
        data,
      );

      toast.success("You have successfully logged in!");
      reset();
      navigate("/");

      // console.log(response.data.token);

      return response.data;
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        toast.error(`Failed to login user: ${err.response?.data.message}`);
        console.error("Failed to login user: ", err.response?.data.message);
        console.error("Response status: ", err.response?.status);
      } else {
        throw err;
      }
    }
  }

  return (
    <Flex gap={32}>
      <LoginImg size="380" />
      <AuthContainer>
        <Card>
          <Logo size="190" />

          <Flex vertical gap={70}>
            <Flex vertical gap={22}>
              <AuthForm $gap="0.875rem" onSubmit={handleSubmit(submit)}>
                <LoginInputs register={register} errors={errors} />

                <Button type="primary" htmlType="submit">
                  Log in
                </Button>
              </AuthForm>

              <Divider style={{ borderColor: "var(--gray-border)" }}>
                <StyledP>OR</StyledP>
              </Divider>
            </Flex>

            <Link to="#">Forgot password</Link>
          </Flex>
        </Card>

        <Card>
          <Flex align="center" justify="center" gap={4}>
            <SmallText>Don't have an account?</SmallText>
            <StyledLink to="/auth/register">Sign up</StyledLink>
          </Flex>
        </Card>
      </AuthContainer>
    </Flex>
  );
}
