import { createSlice } from "@reduxjs/toolkit";

const applicantionSlice = createSlice({
  name: "application",
  initialState: {
    applicants: [],
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload;
    },
  },
});

export const { setAllApplicants } = applicantionSlice.actions;

export default applicantionSlice.reducer;
