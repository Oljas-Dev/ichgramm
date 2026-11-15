import { useAppSelector } from "../../hooks/hooks";

export default function ProfilePage() {
  const data = useAppSelector((state) => state.user.data);

  return <h2>Hello {data?.fullname}</h2>;
}
