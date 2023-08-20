import React from 'react'

function MenuItems(data) {
  return (
    <div className = "Menu-Items">
        <p>{data.name}</p>
        <p>{data.price}</p>
    </div>
  )
}

export default MenuItems;