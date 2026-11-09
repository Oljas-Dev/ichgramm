import styled from "styled-components";
import Logo from "../../../components/logo";
import { AuthContainer } from "../../../styles/common";
import { AuthForm, Card } from "../register/styles";

import forgotPassImg from "./../../../assets/forgot_pass_img.svg";
import { Button, Flex } from "antd";
import Input from "../../../components/input";
import FormDivider from "../../../components/divider/FormDivider";
import { Link, useNavigate } from "react-router-dom";

const ForgotPasswordContainer = styled.div`
  margin-top: 60px;
`;

const NavBar = styled.nav`
  padding: 3px 2.75rem; // 44px
  border-bottom: 1px solid var(--gray-border);

  position: absolute;
  top: -5.0625rem;
  left: 0;
  right: 0;
`;

const StyledLink = styled(Link)`
  font-size: var(--font-size-small) !important;
  font-weight: 600;
  color: black !important;

  margin-bottom: 8.0625rem; // 129px
`;

const BackBtn = styled.button`
  font-size: var(--font-size-small);
  font-weight: 600;
  background-color: rgba(250, 250, 250, 1);
  padding: 0.875rem; //14px
  border-top: 1px solid var(--gray-border);

  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
`;

export default function ForgotPassword() {
  const navigate = useNavigate();
  return (
    <ForgotPasswordContainer>
      <NavBar>
        <Logo size="97" />
      </NavBar>

      <AuthContainer>
        <Card $color="black">
          <Flex vertical gap={60}>
            <Flex align="center" vertical gap={14}>
              <img src={forgotPassImg} width={94} alt="Forgot password image" />
              <h3>Trouble logging in</h3>

              <p style={{ color: "var(--gray-text)" }}>
                Enter your email, phone, or username and we'll send you a link
                to get back into your account.
              </p>

              <AuthForm $gap="1rem">
                <Input placeholder="Email or Username" type="text" />
                <Button type="primary">Reset your password</Button>
              </AuthForm>
            </Flex>

            <Flex vertical gap={16}>
              <FormDivider margin="0" />
              <StyledLink to="/auth/register">Create new account</StyledLink>
            </Flex>
          </Flex>

          <BackBtn onClick={() => navigate(-1)}>Back to login</BackBtn>
        </Card>
      </AuthContainer>
    </ForgotPasswordContainer>
  );
}
