import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logOut, setCredentials } from "../../features/auth/authSlice";
import { showToast } from "../../utils/showToast";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://the-archway-backend.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401 || result?.error?.status === 403) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      const { accessToken } = refreshResult.data;
      api.dispatch(setCredentials({ accessToken }));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
      showToast.error("Session expired. Please log in again.", {
        toastId: "session-expired",
      });
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Project", "Client"],
  endpoints: (builder) => ({}),
});
