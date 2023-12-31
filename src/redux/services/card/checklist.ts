/* eslint-disable indent */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  addChecklist,
  createChecklistItem,
  deleteChecklist,
  deleteChecklistItem,
  editChecklistTitle,
  editTitleChecklistItem,
  markChecklistItemIsDone,
} from '@/services/card/checklist';

export const checklistApi = createApi({
  reducerPath: 'checklistApi',
  baseQuery: fetchBaseQuery(),
  tagTypes: ['Checklist'],
  endpoints: (builder) => ({
    createChecklist: builder.mutation<{ data: any }, { name: string; cardId: string; onSuccess?: () => void }>({
      queryFn: async ({ onSuccess, ...rest }, { signal }) => ({ data: await addChecklist({ ...rest, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    deleteChecklist: builder.mutation<
      { data: any },
      { checklistId: string; cardId: string; boardId: string; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await deleteChecklist({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    updateChecklistTitle: builder.mutation<
      { data: any },
      { checklistId: string; updatedTitle: string; cardId: string; boardId: string; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await editChecklistTitle({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    markChecklistItemDone: builder.mutation<
      { data: any },
      { itemId: string; checklistId: string; cardId: string; boardId: string; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await markChecklistItemIsDone({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    deleteChecklistItem: builder.mutation<
      { data: any },
      { itemId: string; checklistId: string; cardId: string; boardId: string; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await deleteChecklistItem({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    updateTitleChecklistItem: builder.mutation<
      { data: any },
      { itemId: string; title: string; checklistId: string; cardId: string; boardId: string; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await editTitleChecklistItem({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
    addChecklistItem: builder.mutation<
      { data: any },
      { title: string; checklistId: string; cardId: string; boardId: string; onSuccess?: () => void }
    >({
      queryFn: async (args, { signal }) => ({ data: await createChecklistItem({ ...args, signal }) }),
      onQueryStarted: async ({ onSuccess }, { queryFulfilled }) => {
        await queryFulfilled;
        onSuccess && onSuccess();
      },
    }),
  }),
});

export const {
  useCreateChecklistMutation,
  useDeleteChecklistMutation,
  useUpdateChecklistTitleMutation,
  useMarkChecklistItemDoneMutation,
  useDeleteChecklistItemMutation,
  useUpdateTitleChecklistItemMutation,
  useAddChecklistItemMutation,
} = checklistApi;
