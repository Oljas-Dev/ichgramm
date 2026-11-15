import type { User } from "../../redux/slices/getUserSlice";
import { PicturePlaceholder } from "../../styles/common";

export default function Avatar({ user }: { user: User | null }) {
  return (
    <>
      {user?.avatar ? (
        <img src={user?.avatar} alt={`${user?.fullname}'s name`} width={168} />
      ) : (
        <PicturePlaceholder $profile $width="168px" $height="168px">
          {user?.fullname[0].toUpperCase()}
        </PicturePlaceholder>
      )}
    </>
  );
}
