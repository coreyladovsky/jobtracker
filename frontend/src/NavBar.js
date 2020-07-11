import React from "react";
import { logout } from "./util/firebaseFunctions";
import Search from "./features/search/Search";
import AppBar from "@material-ui/core/AppBar";
import "./NavBar.css";

export default () => {
  return (
      <nav>
        <Search />
        <button onClick={logout} className={"button"}>Log out</button>
      </nav>
  );
};
