import Input from "../input";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { SignUpFormValues } from "../../pages/auth/register";
import { ErrorP, InputsContainer } from "../../styles/common";

export default function RegisterInputs({
  register,
  errors,
}: {
  register: UseFormRegister<SignUpFormValues>;
  errors: FieldErrors<SignUpFormValues>;
}) {
  return (
    <InputsContainer vertical gap={6}>
      <Input
        placeholder="Full Name"
        {...register("fullname", {
          required: "Your name is required",
          minLength: {
            value: 2,
            message: "Minimum name length is 2",
          },
        })}
      />
      <ErrorP>{errors.fullname?.message}</ErrorP>

      <Input
        placeholder="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email",
          },
        })}
      />
      <ErrorP>{errors.email?.message}</ErrorP>

      <Input
        placeholder="Username"
        {...register("username", {
          required: true,
          minLength: {
            value: 2,
            message: "Minimum username length is 2",
          },
        })}
      />
      <ErrorP>{errors.username?.message}</ErrorP>

      <Input
        type="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          pattern: {
            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
            message:
              "Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number.",
          },
        })}
      />
      <ErrorP>{errors.password?.message}</ErrorP>
    </InputsContainer>
  );
}
