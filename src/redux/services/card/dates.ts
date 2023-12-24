/* eslint-disable indent */
import { editDueDates, markCardIsDone, removeDates } from '@/services/card/dates';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const datesApi = createApi({
  reducerPath: 'datesApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Dates'],
  endpoints: (builder) => ({
    editDueDate: builder.mutation<
      { data: any },
      {
        startDate: string;
        endDate: string;
        cardId: string;
        onSuccess?: () => void;
      }
    >({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await editDueDates({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    deleteDates: builder.mutation<
      { data: any },
      {
        cardId: string;
        onSuccess?: () => void;
      }
    >({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await removeDates({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    markCardIsDone: builder.mutation<
      { data: any },
      { cardId: string; boardId: string; isDone: boolean; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await markCardIsDone({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
  }),
});

export const { useEditDueDateMutation, useDeleteDatesMutation, useMarkCardIsDoneMutation } = datesApi;
