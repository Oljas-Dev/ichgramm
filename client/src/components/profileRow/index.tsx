import { Button, Flex } from "antd";
import styled from "styled-components";
import { getMemberDuration } from "../../helpers/getMemberDuration";
import { PicturePlaceholder, type ProfileProps } from "../../styles/common";
import { useAppDispatch } from "../../hooks/hooks";
import { closeModal } from "../../redux/slices/modalSlice";
import { useNavigate } from "react-router-dom";

const ProfileRowContainer = styled.div<ProfileProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: ${({ $profile }) => $profile && "0.75rem"};
  margin-top: ${({ $profile }) => $profile && "1.625rem"};
  cursor: pointer;

  button {
    font-weight: 600;
  }

  &:hover {
    background-color: ${({ $profile }) => $profile && "var(--gray-border)"};
  }
`;

const AvatarImage = styled.img`
  border-radius: 50%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
`;

const UserSinceP = styled.p`
  color: var(--gray-text);
`;

export default function ProfileRow({
  img,
  name,
  follow,
  menuRow,
  createdAt,
  userId,
}: {
  img?: string;
  name: string | undefined;
  follow?: boolean;
  menuRow?: boolean;
  createdAt?: string;
  userId?: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const memberSince = getMemberDuration(createdAt);

  if (!name) return <p>Did not find user's name</p>;

  function handleProfileClick() {
    navigate(`/profile/${userId}`);
    dispatch(closeModal());
  }

  if (menuRow) {
    return (
      <ProfileRowContainer $profile onClick={handleProfileClick}>
        {img ? (
          <AvatarImage src={img} alt={`${name}'s name`} width={28} />
        ) : (
          <PicturePlaceholder $profile>
            {name[0].toUpperCase()}
          </PicturePlaceholder>
        )}
        <p>{name}</p>
      </ProfileRowContainer>
    );
  } else {
    return (
      <ProfileRowContainer onClick={handleProfileClick}>
        {img ? (
          <AvatarImage src={img} alt={`${name}'s name`} width={28} />
        ) : (
          <PicturePlaceholder>{name[0].toUpperCase()}</PicturePlaceholder>
        )}
        <Flex gap={8}>
          <p>{name}</p>
          {createdAt && <UserSinceP>• {memberSince} •</UserSinceP>}
        </Flex>

        {follow && <Button type="link">follow</Button>}
      </ProfileRowContainer>
    );
  }
}
