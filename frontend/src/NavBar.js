import React from "react";
import { logout } from "./util/firebaseFunctions";
import Search from "./features/search/Search";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "./features/modal/modalSlice";
import { selectJobCount } from "./features/jobs/jobsSlice";

export default () => {
  const dispatch = useDispatch()
  const jobCount = useSelector(selectJobCount);
  return (
    <nav>
      <button className={"button"} onClick={() => dispatch(setShow(true))}>
        + Add
      </button>
      <Search />
      <div className="jobCount">
        You've applied to {jobCount} jobs!
      </div>
      <button onClick={logout} className={"button"}>
        Log out
      </button>
    </nav>
  );
};
