import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getUser } from "../../redux/slices/getUser";

export default function ProfilePage() {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.getUser.data);

  useEffect(() => {
    dispatch(getUser("current"));
  }, [dispatch]);

  console.log(data);

  return <h2>Hello {data?.fullname}</h2>;
}
