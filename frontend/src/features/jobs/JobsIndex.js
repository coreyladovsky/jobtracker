import React, { useEffect, useContext } from 'react'
import JobsIndexItem from './JobsIndexItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectFilteredJobs, fetchAllJobs } from "./jobsSlice";
import { AuthContext } from '../../providers/AuthProvider'
import "./JobsIndex.css";
import { selectPagination } from '../pagination/paginationSlice';

export default () => {
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllJobs(token))
    }, [token, dispatch])
    const jobs = useSelector(selectFilteredJobs)
    const {startIdx, endIdx} = useSelector(selectPagination)

    return (
      <ul className="jobsList">
        <li id="jobListLegend">
          <div>Company / Position </div>
          <div>Status </div>
          <div className="lastModified">Time Since Last Update</div>
        </li>
        {jobs.slice(startIdx, endIdx).map((job) => {
          return <JobsIndexItem job={job} key={job.id} />;
        })}
      </ul>
    );
}
