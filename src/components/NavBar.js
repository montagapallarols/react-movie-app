import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar(props) {
  return (
    <div>
      <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>
        Home {true}
      </NavLink>
      <NavLink to="/about" activeStyle={{ fontWeight: "bold" }}>
        About{" "}
      </NavLink>
      <NavLink to="/discover" activeStyle={{ fontWeight: "bold" }}>
        Discover
      </NavLink>
    </div>
  );
}
