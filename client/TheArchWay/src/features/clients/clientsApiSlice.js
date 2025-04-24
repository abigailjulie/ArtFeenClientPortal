import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const clientsAdapter = createEntityAdapter({});

const initialState = clientsAdapter.getInitialState();

export const clientsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getClients: builder.query({
      query: () => "/clients",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedClients = responseData.map((client) => {
          client.id = client._id;
          return client;
        });
        return clientsAdapter.setAll(initialState, loadedClients);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Client", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Client", id })),
          ];
        } else return [{ type: "Client", id: "LIST" }];
      },
    }),
  }),
});

export const { useGetClientsQuery } = clientsApiSlice;

export const selectClientsResult =
  clientsApiSlice.endpoints.getClients.select();

const selectClientsData = createSelector(
  selectClientsResult,
  (clientsResult) => clientsResult.data
);

export const {
  selectAll: selectAllClients,
  selectById: selectClientsById,
  selectIds: selectClientIds,
} = clientsAdapter.getSelectors(
  (state) => selectClientsData(state) ?? initialState
);
