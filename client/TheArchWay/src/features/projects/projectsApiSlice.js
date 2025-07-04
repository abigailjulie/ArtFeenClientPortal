import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const projectsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    a.completed === b.completed ? 0 : a.completed ? 1 : -1,
});

const initialState = projectsAdapter.getInitialState();

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedProjects = responseData.map((project) => {
          project.id = project._id;
          return project;
        });
        return projectsAdapter.setAll(initialState, loadedProjects);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Project", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Project", id })),
          ];
        } else return [{ type: "Project", id: "LIST" }];
      },
    }),
    addNewProject: builder.mutation({
      query: (initialProjectData) => ({
        url: "/projects",
        method: "POST",
        body: {
          ...initialProjectData,
        },
      }),
      invalidatesTags: [{ type: "Project", id: "LIST" }],
    }),
    updateProject: builder.mutation({
      query: (initialProjectData) => ({
        url: "/projects",
        method: "PATCH",
        body: initialProjectData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
        { type: "Project", id: "LIST" },
      ],
    }),
    deleteProject: builder.mutation({
      query: ({ id }) => ({
        url: "/projects",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Project", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useAddNewProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;

export const selectProjectsResult =
  projectsApiSlice.endpoints.getProjects.select();

const selectProjectsData = createSelector(
  selectProjectsResult,
  (projectsResult) => projectsResult.data
);

export const {
  selectAll: selectAllProjects,
  selectById: selectProjectsById,
  selectIds: selectProjectIds,
} = projectsAdapter.getSelectors(
  (state) => selectProjectsData(state) ?? initialState
);
