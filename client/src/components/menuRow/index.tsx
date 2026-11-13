import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ProfileRow from "../profileRow";

const StyledMenuRow = styled.li`
  display: flex;
  gap: 1rem;
  padding: 0.75rem; // 12px

  &:hover {
    background-color: var(--gray-border);
  }
`;

export default function MenuRow({
  icon,
  title,
  link,
}: {
  icon: string;
  title: string;
  link: string;
}) {
  if (title === "Profile") {
    return (
      <NavLink to={link}>
        <ProfileRow name={title} menuRow />
      </NavLink>
    );
  } else {
    return (
      <NavLink to={link}>
        <StyledMenuRow>
          <img src={icon} alt={`${title}-icon`} width={24} />
          <p>{title}</p>
        </StyledMenuRow>
      </NavLink>
    );
  }
}
