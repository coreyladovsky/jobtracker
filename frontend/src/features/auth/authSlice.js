import { createSlice } from "@reduxjs/toolkit";
import { getFirebaseIdToken } from "../../util/firebaseFunctions";

export const getNewFirebaseIdToken = () => async (dispatch) => {
  try {
    let token = await getFirebaseIdToken();
    return dispatch(updateToken(token));
  } catch (err) {
    console.log(err);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: null, token: null },
  reducers: {
    updateCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    updateToken: (state, { payload }) => {
      state.token = payload;
    },
    logoutUser: (_, { payload }) => ({ currentUser: null, token: null }),
  },
});

export const { updateCurrentUser, updateToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;
