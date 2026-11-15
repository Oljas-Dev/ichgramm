import { Outlet } from "react-router-dom";
import { MainContainer } from "../../styles/common";
import LeftNavPanel from "../../components/leftNavPanel";
import Footer from "../../components/footer";

export default function Applayout() {
  return (
    <MainContainer>
      <LeftNavPanel />
      <Outlet />
      <Footer />
    </MainContainer>
  );
}
