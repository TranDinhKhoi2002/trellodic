import { mockWorkspace } from '@/apis/mock-data';
import { externalRequest } from '../request';

export const createBoard = async ({ signal, ...rest }: { name: string; workspaceId: string; signal: AbortSignal }) => {
  return externalRequest.post('http://localhost:8080/api/v1/boards', rest, { signal });
};

export const getWorkspace = async (data: { workspaceId: string; signal: AbortSignal }) => {
  const { workspaceId, signal } = data;
  await externalRequest.get(`/posts/${workspaceId}`, { signal });
  return { ...mockWorkspace, name: `W${workspaceId}`, _id: workspaceId };
};

export const getWorkspaceList = async (data: { userId: string; signal: AbortSignal }) => {
  const { userId, signal } = data;
  await externalRequest.get(`/posts/${userId}`, { signal });
  return [
    mockWorkspace,
    {
      ...mockWorkspace,
      name: 'W2',
      boards: [
        {
          _id: '2',
          title: 'aaa',
          admin: '2',
        },
      ],
      _id: '6535cb2d3a66ba004f83df63',
    },
  ];
};

export const editWorkspaceName = ({ signal, ...rest }: { workspaceId: string; name: string; signal: AbortSignal }) => {
  return externalRequest.post('/posts', rest, { signal });
};

export const createWorkspace = ({ signal, ...rest }: { name: string; signal: AbortSignal }) => {
  return externalRequest.post('http://localhost:8080/api/v1/workspaces', rest, { signal });
};

export const getWorkspaceMembers = async (data: { workspaceId: string | undefined }) => {
  const { workspaceId } = data;
  await externalRequest.get('/posts/1');
  return {
    data: {
      members: [
        {
          _id: '1',
          name: 'Member 1',
        },
        {
          _id: '2',
          name: 'Member 2',
        },
      ],
    },
  };
};
