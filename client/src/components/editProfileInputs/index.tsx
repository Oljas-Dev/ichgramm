import { Flex } from "antd";
import { ErrorP, InputsContainer } from "../../styles/common";
import {
  EditInput,
  InputIcon,
  InputWithIcon,
  StyledTextarea,
} from "../../pages/profile/edit/styles";
import { CharacterCounter } from "../../pages/home/create-post/styles";

import linkIcon from "./../../assets/profile_link.svg";
import type { UpdateUserTypes } from "../../pages/profile/edit";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

interface EditProfileFormProps {
  register: UseFormRegister<UpdateUserTypes>;
  errors: FieldErrors<UpdateUserTypes>;
}

export default function EditProfileInputs({
  register,
  errors,
}: EditProfileFormProps) {
  const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=]*)?$/;

  return (
    <InputsContainer vertical gap={21}>
      <Flex vertical gap={8}>
        <label htmlFor="username">Username</label>
        <EditInput
          type="text"
          placeholder="username"
          {...register("username", {
            minLength: {
              value: 2,
              message: "Minimum username length is 2",
            },
          })}
        />
        {errors.username?.message && (
          <ErrorP>{errors.username?.message}</ErrorP>
        )}
      </Flex>

      <InputWithIcon vertical gap={8}>
        <label htmlFor="username">Website</label>
        <EditInput
          type="text"
          placeholder="website"
          $icon
          {...register("website", {
            pattern: {
              value: websiteRegex,
              message: "Website does not seem correct",
            },
          })}
        />
        <InputIcon src={linkIcon} alt="link icon" width={12} />

        {errors.website?.message && <ErrorP>{errors.website?.message}</ErrorP>}
      </InputWithIcon>

      <InputWithIcon vertical gap={8}>
        <label htmlFor="username">About</label>
        <StyledTextarea
          placeholder="tell about yourself"
          {...register("about", {
            maxLength: {
              value: 150,
              message: `Maximum length is 150 characters`,
            },
          })}
        />
        <CharacterCounter>
          {0}/{150}
        </CharacterCounter>
        {errors.about?.message && <ErrorP>{errors.about?.message}</ErrorP>}
      </InputWithIcon>
    </InputsContainer>
  );
}
