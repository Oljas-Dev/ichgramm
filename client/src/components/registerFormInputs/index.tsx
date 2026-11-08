import { Flex } from "antd";
import Input from "../input";
import type { UseFormRegister } from "react-hook-form";
import type { SignUpFormValues } from "../../pages/auth/register";

export default function RegisterInputs({
  register,
}: {
  register: UseFormRegister<SignUpFormValues>;
}) {
  return (
    <Flex vertical gap={6}>
      <Input placeholder="Full Name" {...register("fullname")} />
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="Username" {...register("username")} />
      <Input type="password" placeholder="Password" {...register("password")} />
    </Flex>
  );
}
