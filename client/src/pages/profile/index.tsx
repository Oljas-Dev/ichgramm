import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Flex } from "antd";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

import Avatar from "../../components/avatar";
import ProfileUserState from "../../components/profileUserState";
import ProfileUsernameRow from "../../components/profileUsernameRow";

import linkImg from "./../../assets/profile_link.svg";

import {
  Description,
  HeaderContainer,
  ImageContainer,
  PicturesContainer,
  ProfilePageContainer,
} from "./styles";
import type { currentPostType } from "../../types/projectTypes";
import { setModal } from "../../redux/slices/modalSlice";
import { fetchUrl } from "../../variables/commonVariables";
import {
  fetchPostById,
  fetchProfilePage,
} from "../../redux/functions/postFunctions";

export default function ProfilePage() {
  const { userId } = useParams();

  const dispatch = useAppDispatch();
  const accumulatedData = useAppSelector(
    (state) => state.postsLoader.accumulatedData,
  );

  const pictures = accumulatedData?.profilePosts;
  const data = accumulatedData?.profileData;

  const state = {
    posts: pictures?.length,
    followers: accumulatedData?.followers.length,
    following: accumulatedData?.followed.length,
  };

  function handlePost(id: string | undefined) {
    dispatch(fetchPostById(id));
    dispatch(setModal("currentPost"));
  }

  useEffect(() => {
    if (!userId) return;

    async function fetchPosts() {
      dispatch(fetchProfilePage(userId));
    }

    fetchPosts();
  }, [userId, dispatch]);

  return (
    <ProfilePageContainer>
      <HeaderContainer>
        <Avatar user={data} />
        <Flex vertical gap={19.5}>
          <ProfileUsernameRow username={data?.username} />
          <ProfileUserState data={state} />
          {data?.about && <Description>{data?.about}</Description>}

          {data?.website && (
            <Flex gap={8}>
              <img src={linkImg} alt="link image" />
              <Link to={`http://${data?.website}`}>{data?.website}</Link>
            </Flex>
          )}
        </Flex>
      </HeaderContainer>

      <PicturesContainer>
        {pictures?.map((picture: currentPostType) => {
          return (
            <Link
              to="#"
              onClick={() => handlePost(picture._id)}
              key={picture._id}
            >
              <ImageContainer
                src={`${fetchUrl}${picture.image}`}
                alt={picture._id}
              />
            </Link>
          );
        })}
      </PicturesContainer>
    </ProfilePageContainer>
  );
}
