import styled from "styled-components";
import type { User } from "../../redux/slices/authSlice";
import { PicturePlaceholder } from "../../styles/common";
import { fetchUrl } from "../../variables/commonVariables";

const Image = styled.img`
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
`;

export default function Avatar({
  user,
  size = "168px",
}: {
  user?: User | null;
  size?: string;
}) {
  // console.log(user);

  return (
    <>
      {user?.avatar ? (
        <Image
          src={`${fetchUrl}${user?.avatar}`}
          alt={`${user?.username}'s name`}
          width={size}
        />
      ) : (
        <PicturePlaceholder $profile $width={size} $height={size}>
          {user?.username[0]?.toUpperCase()}
        </PicturePlaceholder>
      )}
    </>
  );
}
