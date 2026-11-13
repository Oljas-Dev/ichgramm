import { Outlet } from "react-router-dom";
import { MainContainer } from "../../styles/common";
import LeftNavPanel from "../../components/leftNavPanel";

export default function Applayout() {
  return (
    <MainContainer>
      <LeftNavPanel />
      <Outlet />
    </MainContainer>
  );
}
