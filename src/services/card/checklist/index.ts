import { externalRequest } from '../../request';

export const addChecklist = ({ cardId, signal, ...rest }: { name: string; cardId: string; signal: AbortSignal }) => {
  return externalRequest.post(`/cards/${cardId}/checklists`, rest, {
    signal: signal,
  });
};

export const deleteChecklist = (data: {
  checklistId: string;
  cardId: string;
  boardId: string;
  signal: AbortSignal;
}) => {
  return externalRequest.delete('https://jsonplaceholder.typicode.com/posts/1', {
    signal: data.signal,
  });
};

export const editChecklistTitle = (data: {
  checklistId: string;
  updatedTitle: string;
  cardId: string;
  boardId: string;
  signal: AbortSignal;
}) => {
  return externalRequest.post('https://jsonplaceholder.typicode.com/posts', data, {
    signal: data.signal,
  });
};

export const markChecklistItemIsDone = (data: {
  itemId: string;
  checklistId: string;
  cardId: string;
  boardId: string;
  signal: AbortSignal;
}) => {
  return externalRequest.post(
    'https://jsonplaceholder.typicode.com/posts',
    {},
    {
      signal: data.signal,
    },
  );
};

export const deleteChecklistItem = (data: {
  itemId: string;
  checklistId: string;
  cardId: string;
  boardId: string;
  signal: AbortSignal;
}) => {
  return externalRequest.delete('https://jsonplaceholder.typicode.com/posts/1', {
    signal: data.signal,
  });
};

export const editTitleChecklistItem = (data: {
  itemId: string;
  title: string;
  checklistId: string;
  cardId: string;
  boardId: string;
  signal: AbortSignal;
}) => {
  return externalRequest.put('https://jsonplaceholder.typicode.com/posts/1', data, {
    signal: data.signal,
  });
};

export const createChecklistItem = (data: {
  title: string;
  checklistId: string;
  cardId: string;
  boardId: string;
  signal: AbortSignal;
}) => {
  return externalRequest.post('https://jsonplaceholder.typicode.com/posts', data, {
    signal: data.signal,
  });
};
