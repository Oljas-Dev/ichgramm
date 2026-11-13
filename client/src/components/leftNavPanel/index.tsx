import styled from "styled-components";
import Logo from "../logo";
import MenuList from "../menuList";

const NavPanel = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.3125rem; // 21px
  padding: 1.75rem 1.5625rem; //28px 25px
`;

export default function LeftNavPanel() {
  return (
    <NavPanel>
      <Logo size="97" />

      <MenuList />
    </NavPanel>
  );
}
