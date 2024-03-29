import { isEmpty } from 'lodash';
import AddIcon from '@mui/icons-material/Add';
import { Box, Divider, IconButton, Skeleton, Stack, Typography } from '@/components/UIElements';
import { useCreateWorkspace } from '@/hooks';
import { Workspace } from '@/types/workspace.type';
import WorkspaceItem from './components/WorkspaceItem';
import Members from './components/Members';

type WorkspaceSidebarViewProps = {
  isFetching: boolean;
  workspaces: Workspace[];
};

function WorkspaceSidebarView({ isFetching, workspaces }: WorkspaceSidebarViewProps) {
  const { renderCreateWorkspaceModal, handleShowCreateModal } = useCreateWorkspace();

  const renderWorkspaces = () => {
    if (isEmpty(workspaces)) {
      return <Typography sx={{ my: 3, textAlign: 'center' }}>No workspaces found</Typography>;
    }

    return workspaces.map((workspace) => <WorkspaceItem key={workspace._id} workspace={workspace} />);
  };

  return (
    <>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Typography>Workspaces</Typography>
          <IconButton onClick={handleShowCreateModal}>
            <AddIcon />
          </IconButton>
        </Stack>
        {isFetching ? (
          <Stack spacing={1}>
            {[...Array(2)].map((_, index) => (
              <Skeleton key={index} variant="rounded" height={30} />
            ))}
          </Stack>
        ) : (
          renderWorkspaces()
        )}
        <Divider />
        {!isEmpty(workspaces) && (
          <Stack sx={{ my: 2 }} spacing={1}>
            <Members />
          </Stack>
        )}
      </Box>
      {renderCreateWorkspaceModal()}
    </>
  );
}

export default WorkspaceSidebarView;
