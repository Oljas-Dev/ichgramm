import { Button, Flex } from "antd";
import styled from "styled-components";
import { getMemberDuration } from "../../helpers/getMemberDuration";

interface ProfileProps {
  $profile?: boolean;
}

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

const PicturePlaceholder = styled.div<ProfileProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.75rem;
  height: 1.75rem;
  background: gray;
  font-size: var(--font-size-xs);
  color: var(--gray-border);
  border-radius: 50%;

  border: ${({ $profile }) => $profile && "1px solid rgba(0, 0, 0, 0.098)"};
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
          <UserSinceP>• {memberSince} •</UserSinceP>
        </Flex>

        {!follow && <Button type="link">follow</Button>}
      </ProfileRowContainer>
    );
  }
}
