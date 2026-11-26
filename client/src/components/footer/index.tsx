import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch } from "../../hooks/hooks";
import { setModal } from "../../redux/slices/modalSlice";

const FooterContainer = styled.footer`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 45px;
  background-color: #fff;
  padding: 22px 0 61px;

  z-index: 100;

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

  li {
    cursor: pointer;
  }
`;

export default function Footer() {
  const dispatch = useAppDispatch();

  return (
    <FooterContainer>
      <StyledList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="#" onClick={() => dispatch(setModal("search"))}>
            Search
          </Link>
        </li>
        <li>
          <Link to="/explore">Explore</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <Link to="#" onClick={() => dispatch(setModal("notifications"))}>
            Notifications
          </Link>
        </li>
        <li onClick={() => dispatch(setModal("create"))}>Create</li>
      </StyledList>
      <p>© 2024 ICHgram</p>
    </FooterContainer>
  );
}
