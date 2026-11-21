import { Button, Flex } from "antd";

import Avatar from "../../../components/avatar";
import linkIcon from "./../../../assets/profile_link.svg";
import { CharacterCounter } from "../../home/create-post/styles";
import {
  EditInput,
  EditProfileContainer,
  InputIcon,
  InputsContainer,
  InputWithIcon,
  NewAvatar,
  StyledButton,
  StyledTextarea,
} from "./styles";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { useForm, type SubmitHandler } from "react-hook-form";
import { ErrorP } from "../../../styles/common";
import { updateUserProfile } from "../../../redux/slices/updateUserSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect } from "react";

export interface UpdateUserTypes {
  username: string;
  avatar: File | null;
  website: string;
  about: string;
}

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserTypes>({
    defaultValues: {
      username: "",
      website: "",
      about: "",
      avatar: null,
    },
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => state.postsLoader.accumulatedData,
  )?.profileData;
  const navigate = useNavigate();

  const websiteRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-./?%&=]*)?$/;

  const submit: SubmitHandler<UpdateUserTypes> = (data) => {
    dispatch(updateUserProfile({ userId: user?._id, data })).unwrap();
    reset(data);
    toast.success("User profile was successfully updated");
    navigate(`/profile/${user?._id}`);
  };

  useEffect(() => {
    // form inputs autofill
    if (user) {
      reset({
        username: user.username || "",
        website: user.website || "",
        avatar: null,
        about: user.about || "",
      });
    }
  }, [user, reset]);

  return (
    <EditProfileContainer onSubmit={handleSubmit(submit)}>
      <h2>Edit profile</h2>

      <Flex vertical gap={33}>
        <NewAvatar justify="space-between" align="center">
          <Flex gap={16} align="center">
            <Avatar user={user} size="56px" />

            <Flex vertical gap={9}>
              <h3>{user?.username}</h3>
              <p>{user?.about}</p>
            </Flex>
          </Flex>

          <Button type="primary">New photo</Button>
        </NewAvatar>

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

            {errors.website?.message && (
              <ErrorP>{errors.website?.message}</ErrorP>
            )}
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
      </Flex>

      <StyledButton type="primary" htmlType="submit">
        Save
      </StyledButton>
    </EditProfileContainer>
  );
}
