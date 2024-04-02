import "./sidebar.scss";
import Menu from "./menu/Menu";
// import { auth, signOut } from "@/auth";
import { MdLogout } from "react-icons/md"

const getMenu = (user) => {
  if (!user) {
    return null
  }

  const products = {
    id: 1, title: "Main",
    listItems: [
      { id: 1, title: "Packages", url: "/dashboard/packages", icon: "/user.svg" },
      { id: 2, title: "Readymade", url: "/dashboard/readymade", icon: "/user.svg" },
      { id: 2, title: "Apps", url: "/dashboard/apps", icon: "/user.svg" },
    ],
  }

  const funnel = {
    id: 2, title: "Funnel",
    listItems: [
      { id: 1, title: "Awareness", url: "/dashboard/funnel/awareness", icon: "/product.svg" },
      { id: 2, title: "Lead", url: "/dashboard/funnel/lead", icon: "/user.svg" },
      { id: 3, title: "Follow up", url: "/dashboard/funnel/follow-up", icon: "/user.svg" },
      { id: 4, title: "Negotiation", url: "/dashboard/funnel/negotiation", icon: "/user.svg" },
      { id: 5, title: "Purchased", url: "/dashboard/funnel/purchased", icon: "/user.svg" },
      { id: 6, title: "Repurchased", url: "/dashboard/funnel/repurchased", icon: "/user.svg" },
    ],
  }

  const menu = [products, funnel]

  return menu
};

const SideBar = async () => {
  // const { user } = await auth()

  const menu = getMenu("user")


  return (
    <div className="menu">
      <div className="logo">
        <img src="/logo.svg" alt="" />
        <span>VIYAGA</span>
      </div>
      {menu?.map((item) => (
        <Menu item={item} key={item.id} />
      ))}
      <form action={async () => {
        "use server";
        await signOut();
      }}
      >
        <button className="logout">
          <MdLogout size={24} />
          <span className="logout-title">Logout</span>
        </button>
      </form>
    </div>
  );
};

export default SideBar;
