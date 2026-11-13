import { Outlet } from "react-router-dom";
import { AuthLayout } from "../../styles/common";

export default function Auth() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}
