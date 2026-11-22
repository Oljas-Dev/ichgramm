import { Button, Flex } from "antd";
import styled from "styled-components";
import { getMemberDuration } from "../../helpers/getMemberDuration";
import { PicturePlaceholder, type ProfileProps } from "../../styles/common";

const ProfileRowContainer = styled.div<ProfileProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: ${({ $profile }) => $profile && "0.75rem"};
  margin-top: ${({ $profile }) => $profile && "1.625rem"};
  cursor: ${({ $profile }) => $profile && "pointer"};

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
}: {
  img?: string;
  name: string | undefined;
  follow?: boolean;
  menuRow?: boolean;
  createdAt?: string;
}) {
  const memberSince = getMemberDuration(createdAt);

  if (!name) return <p>Did not find user's name</p>;

  if (menuRow) {
    return (
      <ProfileRowContainer $profile>
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
      <ProfileRowContainer>
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
