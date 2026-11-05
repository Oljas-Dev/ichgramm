import { Outlet } from "react-router-dom";
import { MainContainer } from "../../styles/common";

export default function Auth() {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
}
