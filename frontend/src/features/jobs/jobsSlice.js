import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../util/apiURL";

const API = apiURL();

const normalize = (arr) => {
  return arr.reduce((acc, el) => {
    acc[el.id] = el;
    return acc;
  }, {});
};

export const fetchAllJobs = (token) => async (dispatch) => {
  try {
    const res = await axios({
      method: "get",
      url: `${API}/api/jobs`,
      headers: {
        AuthToken: token,
      },
    });

    dispatch(receiveJobs(normalize(res.data.jobs)));
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateJob = (job, token) => async (dispatch) => {
  try {
    let res = await axios({
      method: "put",
      url: `${API}/api/jobs/${job.id}`,
      headers: {
        AuthToken: token,
      },
      data: job,
    });
    dispatch(receiveJob(res.data.job))
  } catch (err) {}
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {},
  reducers: {
    receiveJobs: (state, { payload }) =>  payload,
    receiveJob: (state, {payload}) => {state[payload.id] = payload },
  },
});

export const { receiveJobs, receiveJob } = jobsSlice.actions;
export default jobsSlice.reducer;

export const selectJobs = (state) => Object.values(state.jobs);
