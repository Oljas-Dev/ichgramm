import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { CreatePostFormValues } from "../../pages/home/create-post";
import {
  FormHeader,
  Form,
  InputArea,
  AddFileContainer,
  TextareaGroup,
  TextareaWrapper,
  StyledTextarea,
  CharacterCounter,
  EmojiWrapper,
} from "../../pages/home/create-post/styles";
import { Button } from "antd";
import ProfileRow from "../profileRow";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";

import cloudImg from "./../../assets/cloud.svg";
import emojiBtn from "./../../assets/emojiBtn.svg";

import type {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
  UseFormReset,
  UseFormSetValue,
  FieldErrors,
  SubmitHandler,
} from "react-hook-form";
import { ErrorP } from "../../styles/common";

interface AddPostFormProps {
  handleSubmit: UseFormHandleSubmit<CreatePostFormValues>;
  showModal: () => void;
  register: UseFormRegister<CreatePostFormValues>;
  watch: UseFormWatch<CreatePostFormValues>;
  reset: UseFormReset<CreatePostFormValues>;
  setValue: UseFormSetValue<CreatePostFormValues>;
  errors: FieldErrors<CreatePostFormValues>;
}

export default function AddPostForm({
  handleSubmit,
  showModal,
  register,
  watch,
  reset,
  setValue,
  errors,
}: AddPostFormProps) {
  const [showEmojii, setShowEmojii] = useState(false);

  const navigate = useNavigate();
  const MAX_LENGTH = 1000;
  const description = watch("description") || "";

  const onSubmit: SubmitHandler<CreatePostFormValues> = async (data) => {
    const formData = new FormData();

    formData.append("description", data.description);
    formData.append("image", data.image[0]);

    try {
      const response = await fetch("http://localhost:3333/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create post");
      }

      toast.success("Post was created!");
      navigate("/");
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  // Emoji handler
  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const newDescription = description + emojiData.emoji;

    if (newDescription.length > 500) return;

    setValue("description", newDescription, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormHeader>
        <h3>Create new post</h3>
        <Button type="link" htmlType="submit">
          Share
        </Button>
      </FormHeader>

      <InputArea>
        <AddFileContainer>
          <button type="button" onClick={showModal}>
            <img src={cloudImg} alt="Cloud Image" />
          </button>
          <ErrorP>{errors.image?.message}</ErrorP>
        </AddFileContainer>

        <TextareaGroup vertical gap={16}>
          <ProfileRow name="skai_laba" />

          <TextareaWrapper>
            <StyledTextarea
              rows={8}
              {...register("description", {
                required: "Please add your description",
                maxLength: {
                  value: MAX_LENGTH,
                  message: `Maximum length is ${MAX_LENGTH} characters`,
                },
              })}
            />
            <ErrorP>{errors.description?.message}</ErrorP>

            <button
              type="button"
              onClick={() => setShowEmojii((emoji) => !emoji)}
            >
              <img src={emojiBtn} alt="Emoji button" />
            </button>

            <CharacterCounter>
              {description.length}/{MAX_LENGTH}
            </CharacterCounter>
          </TextareaWrapper>
          {showEmojii && (
            <EmojiWrapper>
              <EmojiPicker
                height={350}
                width={300}
                onEmojiClick={handleEmojiClick}
                className="my-picker"
              />
            </EmojiWrapper>
          )}
        </TextareaGroup>
      </InputArea>
    </Form>
  );
}
