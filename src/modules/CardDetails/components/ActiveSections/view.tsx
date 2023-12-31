import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import LaptopIcon from '@mui/icons-material/Laptop';
import { withBoard, BoardGlobalProps } from '@/hocs';
import Members from '../Members';
import Labels from '../Labels';
import Dates from '../Dates';
import EditCardTitle from './components/EditCardTitle';

function ActiveSectionsView({ card }: BoardGlobalProps) {
  const [editMode, setEditMode] = useState(false);

  const handleEditMode = () => {
    setEditMode((prevState) => !prevState);
  };

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={1}>
        <LaptopIcon />
        {editMode ? (
          <EditCardTitle currentTitle={card.title || ''} cardId={card._id} onClose={handleEditMode} />
        ) : (
          <Typography
            variant="h6"
            component="span"
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden', cursor: 'pointer' }}
            onClick={handleEditMode}
          >
            {card?.title}
          </Typography>
        )}
      </Stack>
      <Grid container spacing={4} sx={{ mt: 1 }}>
        {!!card.memberIds?.length && (
          <Grid item>
            <Members />
          </Grid>
        )}
        {!!card.labels?.length && (
          <Grid item>
            <Labels />
          </Grid>
        )}
        {card.endDate && (
          <Grid item>
            <Dates />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default withBoard(ActiveSectionsView);
