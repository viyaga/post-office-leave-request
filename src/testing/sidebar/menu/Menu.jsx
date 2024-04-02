import React from 'react'
import MenuLink from './menuLink/MenuLink'

const Menu = ({ item }) => {
    return (
        <div className="item">
            <span className="title">{item.title}</span>
            {item.listItems.map((listItem) => (
                <MenuLink listItem={listItem} key={listItem.id} />
            ))}
        </div>
    )
}

export default Menu