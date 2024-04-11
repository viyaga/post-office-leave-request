import { menu } from "@/data";
import "./menu.scss";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { signOut } from "@/auth";

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((item) => (
        <div className="item" key={item.id}>
          <span className="title">{item.title}</span>
          {item.listItems.map((listItem) => (
            <Link href={listItem.url} className="listItem" key={listItem.id}>
              {listItem.icon}
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
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

export default Menu;
