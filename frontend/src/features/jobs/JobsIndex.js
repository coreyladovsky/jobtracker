import React, { useEffect, useContext } from 'react'
import JobsIndexItem from './JobsIndexItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectJobs, fetchAllJobs } from './jobsSlice'
import { AuthContext } from '../../providers/AuthProvider'

export default ({handleOpen, setSelectedJob }) => {
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllJobs(token))
    }, [])
    const jobs = useSelector(selectJobs)
    return(
        <ul>
            {jobs.map(job => {
                return <JobsIndexItem job={job} key={job.id} handleOpen={handleOpen} setSelectedJob={setSelectedJob}/>
            })}
        </ul>
    )
}
