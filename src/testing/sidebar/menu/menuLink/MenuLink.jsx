import Link from "next/link"

const MenuLink = ({ listItem }) => {
    return (
        <Link href={listItem.url} className="listItem">
            <img src={listItem.icon} alt="" />
            <span className="listItemTitle">{listItem.title}</span>
        </Link>
    )
}

export default MenuLink