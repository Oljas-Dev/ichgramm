import { Outlet } from "react-router-dom";
import { MainContainer } from "../../styles/common";

export default function Applayout() {
  return (
    <MainContainer>
      Home page
      <Outlet />
    </MainContainer>
  );
}
