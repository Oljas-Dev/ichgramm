import { useState } from "react";
import { Modal } from "antd";
import { CreatePostContainer } from "./styles";
import { useForm } from "react-hook-form";
import AddPostForm from "../../../components/addPostForm";

export interface CreatePostFormValues {
  description: string;
  image: FileList;
}

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<CreatePostFormValues>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

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
      />
      <Modal
        title="Choose your image"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>
    </CreatePostContainer>
  );
}
