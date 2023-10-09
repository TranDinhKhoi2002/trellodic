import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AttachmentIcon from '@mui/icons-material/Attachment';
import DeleteIcon from '@mui/icons-material/Delete';
import { BoardGlobalProps, withBoard } from '@/hocs';
import { Theme } from '@/common/enums';
import { useAlert } from '@/hooks';
import { toast } from 'react-toastify';

type AttachmentViewProps = BoardGlobalProps & {
  onDelete: (_params: string[], _onSuccess: () => void, _onFailed: (_errMsg: string) => void) => void;
};

function AttachmentView({ card, cardId, boardId, onRefreshCard, onDelete }: AttachmentViewProps) {
  const { handleOpenAlert, renderAlert } = useAlert({
    title: 'Delete this file?',
    content: 'You can not get the file back',
    onOk: (restParams) => onDelete(restParams, onRefreshCard, (errMsg: string) => toast.error(errMsg)),
  });

  return (
    <>
      <Box sx={{ mt: 6 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" alignItems="center" spacing={1}>
            <AttachmentIcon />
            <Typography
              variant="body2"
              component="span"
              sx={{ fontSize: '1rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
            >
              Attachments
            </Typography>
          </Stack>
        </Stack>
        <List>
          {card.attachments?.map((attachment) => (
            <ListItem
              key={attachment._id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleOpenAlert(attachment._id, cardId, boardId)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton>
                <ListItemAvatar>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6">{attachment.extension}</Typography>
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color: (theme) => (theme.palette.mode === Theme.Dark ? 'white' : 'black'),
                        fontWeight: 'bold',
                        mb: 1,
                      }}
                    >
                      {attachment.fileName}
                    </Typography>
                  }
                  secondary={`Added on ${dayjs(attachment.createdTime).format('DD-MM-YYYY HH:mm')}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {renderAlert()}
    </>
  );
}

export default withBoard(AttachmentView);
