import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { closeModal } from "../../redux/slices/modalSlice";
import { PicturePlaceholder } from "../../styles/common";
import { fetchUrl } from "../../variables/commonVariables";
import { AvatarImage, ProfileRowContainer } from "../profileRow/styles";

export default function MenuRowCustom() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const current = useAppSelector((state) => state.modal.page);

  const user = useAppSelector((state) => state.user?.data);
  if (!user) return "Could not find user";

  const isSelected =
    (current?.split("/")[0] === "profile" &&
      current?.split("/")[1] === user?._id) ||
    false;

  const avatar = user?.avatar;
  const username = user?.username;

  function handleProfileClick() {
    navigate(`/profile/${user?._id}`);
    dispatch(closeModal());
  }

  return (
    <ProfileRowContainer $profile onClick={handleProfileClick}>
      {avatar ? (
        <AvatarImage
          src={`${fetchUrl}${avatar}`}
          alt={`${username}'s name`}
          width={28}
        />
      ) : (
        <PicturePlaceholder $profile>
          {username.toUpperCase()}
        </PicturePlaceholder>
      )}
      <p className={isSelected ? "current" : ""}>Profile</p>
    </ProfileRowContainer>
  );
}
