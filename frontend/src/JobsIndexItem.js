import React, { useState, useContext } from 'react'
import { AuthContext } from './providers/AuthProvider'
import axios from 'axios';
import { apiURL } from './util/apiURL';

export default ({job}) => {
    debugger
    // const [status, setStatus] = useState(job.status)
    const { token } = useContext(AuthContext);
    const API = apiURL();
    const updateJob = async (e) => {
         await axios({
            method: "put",
            url: `${API}/api/jobs/${job.id}`,
            headers: {
                AuthToken: token,
            },
            data: Object.assign({}, job, {"status": e.target.value})
            });
            // debugger
            // setStatus(e.target.value)
    }
    return (
      <li>
        <div>
          <h3>{job.company}</h3>
          <h4>{job.job_title}</h4>
        </div>
        <select value={job.status} onChange={updateJob}>
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
}
