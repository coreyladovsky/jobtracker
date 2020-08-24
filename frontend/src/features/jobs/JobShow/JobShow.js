import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllJobStatusTimelines } from "../jobsSlice";
import { ArcherContainer, ArcherElement } from "react-archer";

import "./JobShow.css";

export default () => {
  const history = useHistory();
  const { id } = useParams();
  const dispatch = useDispatch();
  const job = useSelector((state) => state.jobs[id]);

  useEffect(() => {
    dispatch(fetchAllJobStatusTimelines(id));
  }, [id, dispatch]);

  const hideSelf = () => history.push("/");

  const formatDate = (time) => {
    return (
      1 +
      new Date(time).getMonth() +
      "/" +
      new Date(time).getDate() +
      "/" +
      new Date(time).getFullYear()
    );
  };

  const formatStatus = (status) => {
    const result = status.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
  };

  if (!job || !job.timelines) return null;

  return (
    <div className="jobShowContainer" onClick={hideSelf}>
      <button>Close</button>
      <ArcherContainer strokeColor="black">
        <ul>
          {job.timelines.map((time, i) => {
            let relations;
            if (i === job.timelines.length - 1) {
              relations = [];
            } else {
              relations = [
                {
                  targetId: "element" + (i + 1),
                  targetAnchor: "left",
                  sourceAnchor: "right",
                },
              ];
            }
            return (
              <ArcherElement id={"element" + i} key={time.created_at} relations={relations}>
                <li >
                  <div>{formatStatus(time.status)}</div>
                  <div>Date: {formatDate(time.created_at)}</div>
                </li>
              </ArcherElement>
            );
          })}
        </ul>
      </ArcherContainer>
    </div>
  );
};
