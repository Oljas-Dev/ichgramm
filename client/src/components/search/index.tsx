import styled from "styled-components";
import MenuPanel from "../menuPanel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  clearSearchResults,
  searchUsers,
} from "../../redux/slices/searchUsersSlice";
import { fetchUrl } from "../../variables/commonVariables";
import { AvatarImage, ProfileRowContainer } from "../profileRow/styles";
import { PicturePlaceholder } from "../../styles/common";
import { Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/slices/modalSlice";

// interface SearchTypes {
//   search: string;
// }

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SearchInput = styled.input`
  background-color: rgba(239, 239, 239, 1);
  width: 100%;
  padding: 0.625rem 1rem; // 10px 16px

  border: none;
  border-radius: 8px;
`;

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { results, status, error } = useAppSelector(
    (state) => state.searchUsers,
  );

  useEffect(() => {
    const query = searchQuery.trim();

    if (query.length < 2) {
      dispatch(clearSearchResults());
      return;
    }

    let abortSearch: (() => void) | undefined;

    const timer = setTimeout(() => {
      const request = dispatch(searchUsers(query));

      abortSearch = () => request.abort();
    }, 300);

    return () => {
      clearTimeout(timer);
      abortSearch?.();
    };
  }, [searchQuery, dispatch]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleUserClick(userId: string | undefined) {
    dispatch(closeModal());
    navigate(`/profile/${userId}`);
  }
  return (
    <MenuPanel titel="Search">
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />

        {status === "loading" && <p>Searching...</p>}

        {status === "failed" && <p>{error}</p>}

        {status === "succeeded" && results.length === 0 && (
          <p>No users found</p>
        )}

        {results.map((user) => (
          <ProfileRowContainer
            key={user._id}
            onClick={() => handleUserClick(user?._id)}
          >
            {user?.avatar ? (
              <AvatarImage
                src={`${fetchUrl}${user?.avatar}`}
                alt={`${user?.username}'s name`}
                width={28}
              />
            ) : (
              <PicturePlaceholder>
                {user?.username[0].toUpperCase()}
              </PicturePlaceholder>
            )}
            <Flex gap={8}>
              <p>{user?.username}</p>
            </Flex>
          </ProfileRowContainer>
        ))}
      </SearchContainer>
    </MenuPanel>
  );
}
