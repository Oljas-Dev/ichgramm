import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ProfileRow from "../profileRow";
import { useAppDispatch } from "../../hooks/hooks";
import { setModal } from "../../redux/slices/modalSlice";
import type { ModalTypes } from "../../types/projectTypes";

const StyledMenuRow = styled.li`
  display: flex;
  gap: 1rem;
  padding: 0.75rem; // 12px
  cursor: pointer;

  &:hover {
    background-color: var(--gray-border);
  }
`;

export default function MenuRow({
  icon,
  title,
  link,
  modal,
}: {
  icon: string;
  title: string;
  link: string;
  modal: boolean;
}) {
  const dispatch = useAppDispatch();
  const allowedModalTypes = [
    "postMenu",
    "currentPost",
    "Create",
    "Search",
    "Notifications",
    "",
  ];

  const isModalType = (value: string): value is ModalTypes => {
    return allowedModalTypes.includes(value as ModalTypes);
  };

  if (title === "Profile") {
    return (
      <NavLink to={link}>
        <ProfileRow name={title} menuRow />
      </NavLink>
    );
  } else if (modal && isModalType(title)) {
    return (
      <StyledMenuRow onClick={() => dispatch(setModal(title))}>
        <img src={icon} alt={`${title}-icon`} width={24} />
        <p>{title}</p>
      </StyledMenuRow>
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
