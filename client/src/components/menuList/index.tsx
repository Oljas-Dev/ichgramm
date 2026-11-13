import home from "./../../assets/menu_icons/home.svg";
import search from "./../../assets/menu_icons/search.svg";
import explore from "./../../assets/menu_icons/explore.svg";
import message from "./../../assets/menu_icons/message.svg";
import heart from "./../../assets/menu_icons/heart.svg";
import create from "./../../assets/menu_icons/create.svg";
import MenuRow from "../menuRow";

export default function MenuList() {
  const menu = [
    {
      icon: home,
      title: "Home",
      link: "/",
    },
    {
      icon: search,
      title: "Search",
      link: "#",
    },
    {
      icon: explore,
      title: "Explore",
      link: "#",
    },
    {
      icon: message,
      title: "Messages",
      link: "#",
    },
    {
      icon: heart,
      title: "Notifications",
      link: "#",
    },
    {
      icon: create,
      title: "Create",
      link: "/create-post",
    },
    {
      icon: "",
      title: "Profile",
      link: "/profile",
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
            key={item.title}
          />
        );
      })}
    </>
  );
}
