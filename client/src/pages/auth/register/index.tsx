import Logo from "../../../components/logo";
import { AuthContainer } from "../../../styles/common";
import { Button, Flex } from "antd";
import { AuthForm, Card, StyledLink } from "./styles";
import RegisterInputs from "../../../components/registerFormInputs";
import RegisterLinks from "../../../components/registerLinks";
import { useForm } from "react-hook-form";

export interface SignUpFormValues {
  username: string;
  email: string;
  fullname: string;
  password: string;
}

export default function SignUp() {
  const { register, handleSubmit, reset } = useForm<SignUpFormValues>();

  function submit(data: SignUpFormValues) {
    console.log(data);

    reset();
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
            <RegisterInputs register={register} />
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
