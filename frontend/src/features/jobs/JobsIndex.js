import React, { useEffect, useContext } from 'react'
import JobsIndexItem from './JobsIndexItem'
import { useSelector, useDispatch } from 'react-redux'
import { selectJobs, fetchAllJobs } from './jobsSlice'
import { AuthContext } from '../../providers/AuthProvider'
import { selectFilter } from '../filter/filterSlice'
import { selectSearch } from '../search/searchSlice'

export default ({handleOpen, setSelectedJob }) => {
    const { token } = useContext(AuthContext);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchAllJobs(token))
    }, [])
    const jobs = useSelector(selectJobs)
    const filters = useSelector(selectFilter)
    const searchTerm = useSelector(selectSearch)
    return(
        <ul>
            {jobs.filter(job => filters[job.status] && job.company.toLowerCase().includes(searchTerm)).map(job => {
                return <JobsIndexItem job={job} key={job.id} handleOpen={handleOpen} setSelectedJob={setSelectedJob}/>
            })}
        </ul>
    )
}
