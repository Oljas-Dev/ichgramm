import { Modal } from "antd";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const { postId } = useParams();

  const open = postId ? true : false;

  return <Modal open={open}>{postId}</Modal>;
}
