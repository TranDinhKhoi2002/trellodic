/* eslint-disable indent */
import { addLabelToCard, createLabel, deleteLabel, editLabel } from '@/services/board/label';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const labelApi = createApi({
  reducerPath: 'labelApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Label'],
  endpoints: (builder) => ({
    addLabel: builder.mutation<
      { data: any },
      { title: string; color: string; boardId: string; cardId?: string; onSuccess?: () => void }
    >({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await createLabel({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    editLabel: builder.mutation<
      { data: any },
      { title: string; color: string; labelId: string; onSuccess?: () => void }
    >({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await editLabel({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    removeLabel: builder.mutation<{ data: any }, { labelId: string; cardId?: string; onSuccess?: () => void }>({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({
        data: await deleteLabel({ ...rest, signal }),
      }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    addLabelToCard: builder.mutation<
      { data: any },
      {
        labelId: string;
        cardId: string;
        onSuccess?: () => void;
      }
    >({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await addLabelToCard({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
  }),
});

export const { useAddLabelMutation, useEditLabelMutation, useRemoveLabelMutation, useAddLabelToCardMutation } =
  labelApi;
