import styled from "styled-components";

export const ProfilePageContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4.6875rem; // 75px;

  padding: 2.375rem 5.9375rem 0 10.625rem; // 38px 95px 0 170px;
  position: relative;
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: start;
  gap: 5.3125rem; // 85px;

  button {
    font-size: var(--font-size-small);
    font-weight: 600;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }

  a {
    color: rgba(0, 55, 107, 1);
    &:hover {
      color: lightblue;
    }
  }
`;

export const Description = styled.p`
  max-width: 435px;
  white-space: pre-wrap;
`;

export const PicturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(100px, 300px));
  justify-content: center;
  gap: 4px;
  width: 100%;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  object-position: top;
`;
