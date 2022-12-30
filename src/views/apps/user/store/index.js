// ** Redux Imports
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// ** Axios Imports
//import axios from "axios";
import useJwt from "@src/auth/jwt/useJwt";

export const getAllData = createAsyncThunk("appUsers/getAllData", async () => {
  const response = await useJwt.get("/users");
  return response.data;
});

export const getData = createAsyncThunk("appUsers/getData", async (params) => {
  const response = await useJwt.get("/users/listData", params);
  return {
    params,
    data: response.data.users,
    totalPages: response.data.total,
  };
});

export const getUser = createAsyncThunk("appUsers/getUser", async (id) => {
  const response = await useJwt.get(`/users/${id}`, {});
  return response.data.user;
});

export const addUser = createAsyncThunk(
  "appUsers/addUser",
  async (user, { dispatch, getState }) => {
    await useJwt.post("/users", user);
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());
    return user;
  }
);

export const deleteUser = createAsyncThunk(
  "appUsers/deleteUser",
  async (id, { dispatch, getState }) => {
    await useJwt.delete(`/users/${id}`, {});
    await dispatch(getData(getState().users.params));
    await dispatch(getAllData());
    return id;
  }
);

export const appUsersSlice = createSlice({
  name: "appUsers",
  initialState: {
    data: [],
    total: 1,
    params: {},
    allData: [],
    selectedUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllData.fulfilled, (state, action) => {
        state.allData = action.payload;
      })
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      });
  },
});

export default appUsersSlice.reducer;
