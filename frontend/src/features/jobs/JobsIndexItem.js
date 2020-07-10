import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useDispatch } from "react-redux";
import { updateJob } from "./jobsSlice";

export default ({ job }) => {
  const { token } = useContext(AuthContext);
  const dispatch = useDispatch();
  const updateJobStatus = async (e) => {
    dispatch(
      updateJob(Object.assign({}, job, { status: e.target.value }), token)
    );
  };
  return (
    <li>
      <div>
        <h3>{job.company}</h3>
        <h4>{job.job_title}</h4>
      </div>
      <select value={job.status} onChange={updateJobStatus}>
        <option value={"wishlist"}>WishList</option>
        <option value={"applied"}>Applied</option>
        <option value={"phoneScreen"}>Phone Screen</option>
        <option value={"codingChallenge"}>Coding Challenge</option>
        <option value={"techScreen"}>Tech Screen</option>
        <option value={"onsite"}>Onsite</option>
        <option value={"offer"}>Offer</option>
      </select>
    </li>
  );
};
