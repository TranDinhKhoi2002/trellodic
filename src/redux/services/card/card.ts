/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Card } from '@/types/card.type';
import { addCard, editCard, fetchCard } from '@/services/card';

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Card'],
  endpoints: (builder) => ({
    getCardDetails: builder.query<Card, { cardId: string }>({
      queryFn: async (args, { signal }) => {
        const card: Card = await fetchCard({ ...args, signal });
        return { data: card };
      },
      providesTags: (_result, _error, { cardId }) => [{ type: 'Card', id: cardId }],
      keepUnusedDataFor: 0,
    }),
    createCard: builder.mutation<
      { data: any },
      { boardId: string; columnId: string; title: string; onSuccess: () => void }
    >({
      queryFn: async (args, { signal }) => {
        const { boardId, ...rest } = args;
        return { data: await addCard({ ...rest, signal }) };
      },
      onQueryStarted: async ({ boardId, onSuccess }, { queryFulfilled, dispatch }) => {
        await queryFulfilled;
        dispatch({
          type: 'boardApi/invalidateTags',
          payload: [{ type: 'Board', id: boardId }],
        });
        onSuccess();
      },
    }),
    editCard: builder.mutation<
      { data: any },
      {
        cardId: string;
        boardId?: string;
        title?: string;
        description?: string;
        cover?: string;
        isDone?: boolean;
        onSuccess?: () => void;
      }
    >({
      queryFn: async ({ boardId, onSuccess, ...rest }, { signal }) => ({ data: await editCard({ ...rest, signal }) }),
      onQueryStarted: async ({ boardId, onSuccess }, { queryFulfilled, dispatch }) => {
        await queryFulfilled;
        onSuccess?.();

        if (boardId) {
          dispatch({
            type: 'boardApi/invalidateTags',
            payload: [{ type: 'Board', id: boardId }],
          });
        }
      },
      invalidatesTags: (_result, _error, { cardId }) => [{ type: 'Card', id: cardId }],
    }),
  }),
});

export const { useGetCardDetailsQuery, useCreateCardMutation, useEditCardMutation } = cardApi;
