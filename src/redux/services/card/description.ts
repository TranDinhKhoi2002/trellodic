/* eslint-disable indent */
import { editDescription } from '@/services/card/description';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const descriptionApi = createApi({
  reducerPath: 'descriptionApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Description'],
  endpoints: (builder) => ({
    editDescription: builder.mutation<
      { data: any },
      {
        content: string;
        boardId: string;
        cardId: string;
        onSuccess?: () => void;
      }
    >({
      queryFn: async (args, { signal }) => ({ data: await editDescription({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
  }),
});

export const { useEditDescriptionMutation } = descriptionApi;
