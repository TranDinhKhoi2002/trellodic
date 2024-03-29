/* eslint-disable indent */
import { addComment, deleteComment, editComment } from '@/services/card/comment';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    createComment: builder.mutation<{ data: any }, { content: string; cardId: string; onSuccess?: () => void }>({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await addComment({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    editComment: builder.mutation<
      { data: any },
      { content: string; commentId: string; cardId: string; onSuccess?: () => void }
    >({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await editComment({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    deleteComment: builder.mutation<{ data: any }, { commentId: string; cardId: string; onSuccess?: () => void }>({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await deleteComment({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
  }),
});

export const { useCreateCommentMutation, useEditCommentMutation, useDeleteCommentMutation } = commentApi;
