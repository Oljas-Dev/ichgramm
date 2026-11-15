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
  name: string;
  follow?: boolean;
  menuRow?: boolean;
  createdAt: string;
}) {
  const memberSince = getMemberDuration(createdAt);

  if (menuRow) {
    return (
      <ProfileRowContainer $profile>
        {img ? (
          <img src={img} alt={`${name}'s name`} width={28} />
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
          <img src={img} alt={`${name}'s name`} width={28} />
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
