import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allJobs: [],
  allAdminJobs: [],
  singleJob: null,
  searchJobByText: "",
  allAppliedJobs: [],
  searchedQuery: "",
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJobs: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    clearJobs: (state) => {
      state.allJobs = [];
      state.singleJob = null;
    },
  },
});

export const {
  setAllJobs,
  clearJobs,
  setSingleJobs,
  setAllAdminJobs,
  setAllAppliedJobs,
  setSearchJobByText,
  setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;
