import type { User } from "../../redux/slices/getUserSlice";
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
        <img src={user?.avatar} alt={`${user?.fullname}'s name`} width={168} />
      ) : (
        <PicturePlaceholder $profile $width={size} $height={size}>
          {user?.fullname[0]?.toUpperCase()}
        </PicturePlaceholder>
      )}
    </>
  );
}
