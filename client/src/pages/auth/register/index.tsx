import Logo from "../../../components/logo";
import { AuthContainer } from "../../../styles/common";
import { Button, Flex } from "antd";
import { AuthForm, Card, SmallText, StyledLink } from "./styles";
import RegisterInputs from "../../../components/registerFormInputs";
import RegisterLinks from "../../../components/registerLinks";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export interface SignUpFormValues {
  username: string;
  email: string;
  fullname: string;
  password: string;
  token?: string;
}

export type ApiError = {
  message: string;
  code: number;
};

export default function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpFormValues>();

  const navigate = useNavigate();

  async function submit(data: SignUpFormValues) {
    try {
      const response = await axios.post<SignUpFormValues>(
        "http://localhost:3333/auth/register",
        data,
      );
      if (!response.data?.token) return "Token was not created";

      toast.success("New user was successfully created!");
      localStorage.setItem("token", response.data?.token);
      reset();
      navigate("/");
    } catch (err) {
      if (axios.isAxiosError<ApiError>(err)) {
        toast.error(`Failed to create user: ${err.response?.data.message}`);
        console.error("Failed to create user: ", err.response?.data.message);
        console.error("Response status: ", err.response?.status);
      } else {
        throw err;
      }
    }
  }

  return (
    <AuthContainer>
      <Card>
        <AuthForm onSubmit={handleSubmit(submit)}>
          <div>
            <Logo size="190" />
            <h3>Sign up to see photos and videos from your friends.</h3>
          </div>

          <Flex vertical gap={26}>
            <RegisterInputs register={register} errors={errors} />
            <RegisterLinks />
            <Button type="primary" htmlType="submit">
              Sign up
            </Button>
          </Flex>
        </AuthForm>
      </Card>

      <Card>
        <Flex justify="center" gap={4}>
          <SmallText>Have an account?</SmallText>
          <StyledLink to="/auth/login">Log in</StyledLink>
        </Flex>
      </Card>
    </AuthContainer>
  );
}
