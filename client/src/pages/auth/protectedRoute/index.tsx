import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../../hooks/hooks";
import type { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { status, token } = useAppSelector((state) => state.user);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!token || status !== "succeeded") {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
}
