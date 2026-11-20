import home from "./../../assets/menu_icons/home.svg";
import search from "./../../assets/menu_icons/search.svg";
import explore from "./../../assets/menu_icons/explore.svg";
import message from "./../../assets/menu_icons/message.svg";
import heart from "./../../assets/menu_icons/heart.svg";
import create from "./../../assets/menu_icons/create.svg";
import MenuRow from "../menuRow";
import { useAppSelector } from "../../hooks/hooks";

export default function MenuList() {
  const userId = useAppSelector((state) => state.user.data?._id);

  const menu = [
    {
      icon: home,
      title: "Home",
      link: "/",
      modal: false,
    },
    {
      icon: search,
      title: "Search",
      link: "#",
      modal: false,
    },
    {
      icon: explore,
      title: "Explore",
      link: "#",
      modal: false,
    },
    {
      icon: message,
      title: "Messages",
      link: "#",
      modal: false,
    },
    {
      icon: heart,
      title: "Notifications",
      link: "#",
      modal: false,
    },
    {
      icon: create,
      title: "Create",
      link: "#",
      modal: true,
    },
    {
      icon: "",
      title: "Profile",
      link: `/profile/${userId}`,
      modal: false,
    },
  ];

  return (
    <>
      {menu.map((item) => {
        return (
          <MenuRow
            icon={item.icon}
            title={item.title}
            link={item.link}
            modal={item.modal}
            key={item.title}
          />
        );
      })}
    </>
  );
}
