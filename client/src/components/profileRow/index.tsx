import { Button } from "antd";
import styled from "styled-components";

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
  color: var(--gray-border);
  border-radius: 50%;

  border: ${({ $profile }) => $profile && "1px solid rgba(0, 0, 0, 0.098)"};
`;

export default function ProfileRow({
  img,
  name,
  follow,
  menuRow,
}: {
  img?: string;
  name: string;
  follow?: boolean;
  menuRow?: boolean;
}) {
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
        <p>{name}</p>

        {follow && <Button type="link">follow</Button>}
      </ProfileRowContainer>
    );
  }
}
