import React from 'react'
import JobsIndexItem from './JobsIndexItem'

export default ({jobs}) => {
    return(
        <ul>
            {jobs.map(job => {
                return <JobsIndexItem job={job} key={job.id} />
            })}
        </ul>
    )
}
