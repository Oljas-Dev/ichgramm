import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button, Flex, Modal } from "antd";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";

import { updateUserProfile } from "../../../redux/slices/updateUserSlice";
import Avatar from "../../../components/avatar";
import EditProfileInputs from "../../../components/editProfileInputs";

import { EditProfileContainer, NewAvatar, StyledButton } from "./styles";
import { ErrorP } from "../../../styles/common";
import { logout } from "../../../redux/slices/authSlice";

export interface UpdateUserTypes {
  username: string;
  avatar: FileList | null;
  website: string;
  about: string;
}

export default function EditProfile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    watch,
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

  const submit: SubmitHandler<UpdateUserTypes> = async (data) => {
    try {
      await dispatch(
        updateUserProfile({
          userId: user?._id,
          data,
        }),
      ).unwrap();

      toast.success("Profile successfully updated");
      navigate(`/profile/${user?._id}`);
    } catch (error) {
      console.error(error);

      toast.error("Could not update profile");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const avatarFile = watch("avatar");

  // Preview avatar before uploading
  useEffect(() => {
    if (!avatarFile?.[0]) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(avatarFile[0]);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [avatarFile]);

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

          <Button type="primary" onClick={showModal}>
            New photo
          </Button>
        </NewAvatar>

        <EditProfileInputs register={register} errors={errors} />
      </Flex>

      <Flex justify="space-between">
        <StyledButton type="primary" htmlType="submit">
          Save
        </StyledButton>
        <StyledButton type="text" onClick={handleLogout}>
          log out
        </StyledButton>
      </Flex>

      <Modal
        title="Choose your new avatar"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <input
          type="file"
          accept="image/*"
          {...register("avatar", {
            required: "Please select an image",
            validate: {
              fileSize: (files) =>
                !files?.[0] ||
                files[0].size <= 5 * 1024 * 1024 ||
                "Maximum image size is 5 MB",
            },
          })}
        />

        {errors.avatar?.message && <ErrorP>{errors.avatar.message}</ErrorP>}

        {previewUrl && (
          <img
            src={previewUrl}
            alt="Avatar preview"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              marginTop: "16px",
            }}
          />
        )}
      </Modal>
    </EditProfileContainer>
  );
}
