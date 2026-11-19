import { Button, Flex } from "antd";

import Avatar from "../../../components/avatar";
import linkIcon from "./../../../assets/profile_link.svg";
import { CharacterCounter } from "../../home/create-post/styles";
import {
  EditInput,
  EditProfileContainer,
  InputIcon,
  InputsContainer,
  InputWithIcon,
  NewAvatar,
  StyledButton,
  StyledTextarea,
} from "./styles";

export default function EditProfile() {
  return (
    <EditProfileContainer>
      <h2>Edit profile</h2>

      <Flex vertical gap={33}>
        <NewAvatar justify="space-between" align="center">
          <Flex gap={16} align="center">
            <Avatar user={null} size="56px" />

            <Flex vertical gap={9}>
              <h3>ichschool</h3>
              <p>• Гарантия помощи с трудоустройством в ведущие IT-компании</p>
            </Flex>
          </Flex>

          <Button type="primary">New photo</Button>
        </NewAvatar>

        <InputsContainer vertical gap={21}>
          <Flex vertical gap={8}>
            <label htmlFor="username">Username</label>
            <EditInput type="text" placeholder="username" />
          </Flex>

          <InputWithIcon vertical gap={8}>
            <label htmlFor="username">Website</label>
            <EditInput type="text" placeholder="website" $icon />
            <InputIcon src={linkIcon} alt="link icon" width={12} />
          </InputWithIcon>

          <InputWithIcon vertical gap={8}>
            <label htmlFor="username">About</label>
            <StyledTextarea placeholder="tell about yourself" />
            <CharacterCounter>
              {0}/{150}
            </CharacterCounter>
          </InputWithIcon>
        </InputsContainer>
      </Flex>

      <StyledButton type="primary">Save</StyledButton>
    </EditProfileContainer>
  );
}
