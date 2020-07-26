import React from "react";
import { logout } from "./util/firebaseFunctions";
import Search from "./features/search/Search";
import "./NavBar.css";
import { useDispatch, useSelector } from "react-redux";
import { setJobFormShow } from "./features/modal/modalSlice";
import { selectJobCount, receiveJobs} from "./features/jobs/jobsSlice";

export default () => {
  const dispatch = useDispatch()
  const jobCount = useSelector(selectJobCount);

   const logoutUser = () => {
     logout();
     dispatch(receiveJobs({}));
   };

  return (
    <nav>
      <button
        className={"button"}
        onClick={() => dispatch(setJobFormShow(true))}
      >
        + Add
      </button>
      <Search />
      <div className="jobCount">You've applied to {jobCount} jobs!</div>
      <button onClick={logoutUser} className={"button"}>
        Log out
      </button>
    </nav>
  );
};
