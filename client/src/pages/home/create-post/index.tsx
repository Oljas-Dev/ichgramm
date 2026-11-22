import { useEffect, useState } from "react";
import { Flex, Modal } from "antd";
import { CreatePostContainer, StyledPreviewImg } from "./styles";
import { useForm } from "react-hook-form";
import AddPostForm from "../../../components/addPostForm";

export interface CreatePostFormValues {
  description: string;
  image: FileList;
}

export default function CreatePost() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreatePostFormValues>();

  const postImage = watch("image");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Preview avatar before uploading
  useEffect(() => {
    if (!postImage?.[0]) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(postImage[0]);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [postImage]);

  return (
    <CreatePostContainer>
      <AddPostForm
        handleSubmit={handleSubmit}
        errors={errors}
        register={register}
        reset={reset}
        setValue={setValue}
        showModal={showModal}
        watch={watch}
        previewImg={previewUrl}
      />
      <Modal
        title="Choose your image"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flex vertical gap={16}>
          {previewUrl && (
            <StyledPreviewImg src={previewUrl} alt="Post image preview" />
          )}

          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Please select an image",
              validate: {
                fileSize: (files) =>
                  !files?.[0] ||
                  files[0].size <= 5 * 1024 * 1024 ||
                  "Maximum image size is 5 MB",
              },
            })}
          />
        </Flex>
      </Modal>
    </CreatePostContainer>
  );
}
