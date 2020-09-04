import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiURL } from "../../util/apiURL";
import { getNewFirebaseIdToken } from "../auth/authSlice";
import { logoutUser } from "../auth/authSlice";

const API = apiURL();

// const normalize = (arr) => {
//   return arr.reduce((acc, el) => {
//     acc[el.id] = { ...acc[el.id], ...el };
//     return acc;
//   }, {});
// };

export const createJob = (job) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    const res = await axios({
      method: "post",
      url: `${API}/api/jobs`,
      headers: {
        AuthToken: token,
      },
      data: job,
    });

    dispatch(receiveJob(res.data.job));
  } catch (err) {}
};

export const fetchAllJobStatusTimelines = (id) => async (
  dispatch,
  getState
) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    const res = await axios({
      method: "get",
      url: `${API}/api/jobs_status_timelines/${id}`,
      headers: {
        AuthToken: token,
      },
    });
    dispatch(receiveJobStatusTimelines(res.data));
  } catch (err) {
    throw Error(err.message);
  }
};

export const fetchAllJobs = () => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    const res = await axios({
      method: "get",
      url: `${API}/api/jobs`,
      headers: {
        AuthToken: token,
      },
    });

    dispatch(receiveJobs(res.data.jobs));
  } catch (err) {
    throw Error(err.message);
  }
};

export const updateJob = (job) => async (dispatch, getState) => {
  try {
    await dispatch(getNewFirebaseIdToken());
    const token = getState().auth.token;
    let res = await axios({
      method: "put",
      url: `${API}/api/jobs/${job.id}`,
      headers: {
        AuthToken: token,
      },
      data: job,
    });
    dispatch(receiveJob(res.data.job));
    if (res.data.timeline) {
      dispatch(receiveJobStatusTimeline(res.data.timeline));
    }
  } catch (err) {}
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState: {},
  reducers: {
    receiveJobs: (state, { payload }) => {
      payload.forEach((el) => {
        state[el.id] = state[el.id] || {};

        state[el.id].timelines = state[el.id].timelines || [];

        state[el.id].timelines.push({
          status: el.timeline_status,
          created_at: el.timeline_created_at,
        });
        state[el.id] = { ...state[el.id], ...el };

        delete state[el.id].timeline_status;
        delete state[el.id].timeline_created_at;
      });
    },
    receiveJob: (state, { payload }) => {
      state[payload.id] = { ...state[payload.id], ...payload };
    },
    receiveJobStatusTimelines: (state, { payload }) => {
      let job_id = payload.job_id;
      let job = state[job_id] || {};
      job.timelines = payload.timelines;
      state[job_id] = { ...state[job_id], timelines: payload.timelines };
    },
    receiveJobStatusTimeline: (state, { payload }) => {
      let job_id = payload.job_id;
      let job = state[job_id];
      job.timelines.push(payload);
      state[job_id] = job;
    },
  },
  extraReducers: {
    [logoutUser]() {
      return {};
    },
  },
});

export const {
  receiveJobs,
  receiveJob,
  receiveJobStatusTimelines,
  receiveJobStatusTimeline,
} = jobsSlice.actions;
export default jobsSlice.reducer;

export const selectJobs = (state) => Object.values(state.jobs).reverse();
export const selectJobCount = (state) =>
  Object.values(state.jobs).filter((job) => job.status !== "wishlist").length;

export const selectFilteredJobs = (state) => {
  let allJobs = Object.values(state.jobs);
  let filters = state.filter;
  let searchTerm = state.search;
  allJobs = allJobs.filter(
    (job) =>
      filters[job.status] &&
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  allJobs.sort((a, b) => {
    return new Date(b.last_modified) - new Date(a.last_modified);
  });
  return allJobs;
};
