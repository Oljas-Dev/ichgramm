import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { closeModal, setModal, setPage } from "../../redux/slices/modalSlice";
import type { ModalTypes } from "../../types/projectTypes";
import MenuRowCustom from "../menuRowCustom";
import { useEffect } from "react";

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
  const location = useLocation();
  const dispatch = useAppDispatch();
  const allowedModalTypes = [
    "postMenu",
    "currentPost",
    "create",
    "search",
    "notifications",
    "",
  ];

  const current = useAppSelector((state) => state.modal.page) === title;
  const currentPath =
    location.pathname === "/" ? "home" : location.pathname.slice(1);

  const isModalType = (value: string): value is ModalTypes => {
    return allowedModalTypes.includes(value as ModalTypes);
  };

  useEffect(() => {
    dispatch(
      setPage({
        next: currentPath,
      }),
    );
  }, [dispatch, currentPath]);

  function handleClick() {
    dispatch(
      setPage({
        next: title,
        current: currentPath,
      }),
    );

    if (modal && isModalType(title)) {
      dispatch(setModal(title));
    }

    if (!modal) {
      dispatch(closeModal());
    }
  }

  if (title === "profile") {
    return (
      <NavLink to={link} onClick={handleClick}>
        <MenuRowCustom />
      </NavLink>
    );
  } else if (modal && isModalType(title)) {
    return (
      <StyledMenuRow onClick={handleClick}>
        <img src={icon} alt={`${title}-icon`} width={24} />
        <p className={current ? "current" : ""}>
          {title[0].toUpperCase() + title.slice(1)}
        </p>
      </StyledMenuRow>
    );
  } else {
    return (
      <NavLink to={link} onClick={handleClick}>
        <StyledMenuRow>
          <img src={icon} alt={`${title}-icon`} width={24} />
          <p className={current ? "current" : ""}>
            {title[0].toUpperCase() + title.slice(1)}
          </p>
        </StyledMenuRow>
      </NavLink>
    );
  }
}
