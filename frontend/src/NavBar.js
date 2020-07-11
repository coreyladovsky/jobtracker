import React from "react";
import { logout } from "./util/firebaseFunctions";
import Search from "./features/search/Search";
import "./NavBar.css";
import { useDispatch } from "react-redux";
import { setShow } from "./features/modal/modalSlice";

export default () => {
  const dispatch = useDispatch()
  return (
    <nav>
      <button className={"button"} onClick={() => dispatch(setShow(true))}>
        + Add
      </button>
      <Search />
      <button onClick={logout} className={"button"}>
        Log out
      </button>
    </nav>
  );
};
