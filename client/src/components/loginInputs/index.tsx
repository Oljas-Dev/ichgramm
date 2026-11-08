import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { ErrorP, InputsContainer } from "../../styles/common";
import Input from "../input";
import type { LoginFormValues } from "../../pages/auth/login";

export default function LoginInputs({
  register,
  errors,
}: {
  register: UseFormRegister<Partial<LoginFormValues>>;
  errors: FieldErrors<Partial<LoginFormValues>>;
}) {
  return (
    <InputsContainer vertical gap={6}>
      <Input
        placeholder="Username or email"
        {...register("identifier", {
          required: "Username or email is required",
          validate: (value) => {
            const trimmed = value?.trim();

            if (!trimmed) {
              return "Username or email is required";
            }

            const isEmail =
              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(trimmed);

            const isUsername = /^[a-zA-Z0-9_]{3,20}$/.test(trimmed);

            return isEmail || isUsername || "Enter a valid username or email";
          },
        })}
      />
      <ErrorP>{errors.identifier?.message}</ErrorP>

      <Input placeholder="Password" type="password" {...register("password")} />
    </InputsContainer>
  );
}
