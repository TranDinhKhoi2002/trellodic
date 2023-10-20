import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import CreateForm from './components/Form';
import Grid from '@mui/material/Grid';
import Modal, { CUSTOM_STYLES_MODAL } from '@/components/Modal';

type CreateWorkspaceModalViewProps = {
  isShowCreateModal: boolean;
  onClose: () => void;
};

const style = {
  minHeight: '630px',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: '#22272b',
  px: 0,
  py: 0,
};

function CreateWorkspaceModalView({ isShowCreateModal, onClose }: CreateWorkspaceModalViewProps) {
  return (
    <Modal isVisibleModal={isShowCreateModal} onClose={onClose}>
      <Grid
        sx={{
          ...CUSTOM_STYLES_MODAL,
          ...style,
          overflow: 'hidden',
        }}
        container
        justifyContent="center"
        direction={{ xs: 'column-reverse', md: 'row' }}
      >
        <Grid item md={6} sx={{ mt: { xs: 4, md: 8 }, mb: 4 }}>
          <Container maxWidth="xs">
            <Typography variant="h5">Let&apos;s build a Workspace</Typography>
            <Typography variant="body1" sx={{ mt: 1 }}>
              Boost your productivity by making it easier for everyone to access boards in one location.
            </Typography>
            <CreateForm />
          </Container>
        </Grid>
        <Grid
          item
          md={6}
          sx={{
            backgroundImage: { md: 'url("https://trello.com/assets/df0d81969c6394b61c0d.svg")' },
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image src="https://trello.com/assets/d1f066971350650d3346.svg" width={300} height={300} alt="" />
        </Grid>
      </Grid>
    </Modal>
  );
}

export default CreateWorkspaceModalView;
