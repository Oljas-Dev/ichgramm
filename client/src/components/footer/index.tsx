import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterContainer = styled.footer`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  background-color: #fff;
  padding: 22px 0 61px;

  position: sticky;
  bottom: 0;
  z-index: 10;

  font-size: var(--small-text-xs);
  color: var(--gray-text);
`;

const StyledList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;

  a {
    color: inherit;

    &:hover {
      color: black;
    }
  }
`;

export default function Footer() {
  return (
    <FooterContainer>
      <StyledList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#">Search</Link>
        </li>
        <li>
          <Link to="#">Explore</Link>
        </li>
        <li>
          <Link to="#">Messages</Link>
        </li>
        <li>
          <Link to="#">Notifications</Link>
        </li>
        <li>
          <Link to="create-post">Create</Link>
        </li>
      </StyledList>
      <p>© 2024 ICHgram</p>
    </FooterContainer>
  );
}
