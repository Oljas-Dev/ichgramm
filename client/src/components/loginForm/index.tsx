import { Button, Card, Flex } from "antd";
import { AuthContainer, TextCenter } from "../../styles/common";
import Logo from "../logo";
import {
  AuthForm,
  SmallText,
  StyledLink,
} from "../../pages/auth/register/styles";
import LoginInputs from "../loginInputs";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { LoginFormValues } from "../../pages/auth/login";
import axios from "axios";
import toast from "react-hot-toast";
import type { ApiError } from "../../pages/auth/register";
import FormDivider from "../divider/FormDivider";

export default function LoginForm() {
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

            <FormDivider />
          </Flex>

          <TextCenter>
            <Link to="/auth/forgot-password">Forgot password</Link>
          </TextCenter>
        </Flex>
      </Card>

      <Card>
        <Flex align="center" justify="center" gap={4}>
          <SmallText>Don't have an account?</SmallText>
          <StyledLink to="/auth/register">Sign up</StyledLink>
        </Flex>
      </Card>
    </AuthContainer>
  );
}
