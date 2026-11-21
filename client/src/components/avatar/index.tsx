import type { User } from "../../redux/slices/authSlice";
import { PicturePlaceholder } from "../../styles/common";

export default function Avatar({
  user,
  size = "168px",
}: {
  user?: User | null;
  size?: string;
}) {
  return (
    <>
      {user?.avatar ? (
        <img src={user?.avatar} alt={`${user?.username}'s name`} width={168} />
      ) : (
        <PicturePlaceholder $profile $width={size} $height={size}>
          {user?.username[0]?.toUpperCase()}
        </PicturePlaceholder>
      )}
    </>
  );
}
