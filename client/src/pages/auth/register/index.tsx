import Logo from "../../../components/logo";
import { AuthContainer } from "../../../styles/common";
import { Button, Flex } from "antd";
import { AuthForm, Card, StyledLink } from "./styles";
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
}

type ApiError = {
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
      await axios.post<SignUpFormValues>(
        "http://localhost:3333/auth/register",
        data,
      );

      toast.success("New user was successfully created!");
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

    // temporary pass: 1483-1475Rafmik!
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

      <Card $paddings="1.625rem 0">
        <p>
          Have an account? <StyledLink to="/auth/login">Log in</StyledLink>
        </p>
      </Card>
    </AuthContainer>
  );
}
