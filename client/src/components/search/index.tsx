import styled from "styled-components";
import MenuPanel from "../menuPanel";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import {
  clearSearchResults,
  searchUsers,
} from "../../redux/slices/searchUsersSlice";
import ProfileRow from "../profileRow";
import { fetchUrl } from "../../variables/commonVariables";

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
          <ProfileRow
            name={user.username}
            img={`${fetchUrl}${user.avatar}`}
            userId={user._id}
            key={user._id}
          />
        ))}
      </SearchContainer>
    </MenuPanel>
  );
}
