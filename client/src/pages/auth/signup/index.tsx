import styled from "styled-components";
import Logo from "../../../components/logo";
import {
  AuthContainer,
  borderColor,
  formTextColor,
} from "../../../styles/common";

const AuthForm = styled.form`
  text-align: center;
  color: ${formTextColor};
  max-width: 35rem;
  padding: 1.9rem 4.2rem;
  border: 1px solid ${borderColor};

  h3 {
    font-size: 1.6rem;
    font-weight: 600;
  }
`;

export default function SignUp() {
  return (
    <AuthContainer>
      <AuthForm>
        <Logo size="190" />

        <h3>Sign up to see photos and videos from your friends.</h3>
      </AuthForm>
    </AuthContainer>
  );
}
