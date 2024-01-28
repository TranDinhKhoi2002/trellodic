import { useState } from 'react';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { Avatar, Box, Button, Card, CardContent, Stack, Typography } from '@/components/UIElements';
import Editor from '@/components/Editor/components/Form';
import { useAppSelector } from '@/redux/store';
import { selectUserProfile } from '@/redux/slices/user';
import { useAlert } from '@/hooks';

type CommentEditorViewProps = {
  isLoading: boolean;
  onSave: (_content: string, _onSaveSuccess: () => void) => void;
};

function CommentEditorView({ isLoading, onSave }: CommentEditorViewProps) {
  const [addMode, setAddMode] = useState(false);
  const [comment, setComment] = useState('');
  const user = useAppSelector(selectUserProfile);

  const handleShowHideEditor = () => {
    setAddMode(!addMode);
  };

  const handleCommentChange = (content: string) => {
    setComment(content);
  };

  const handleCloseEditor = () => {
    if (comment) {
      handleOpenAlert();
    } else {
      setAddMode(false);
    }
  };

  const handleClear = () => {
    setAddMode(false);
    setComment('');
  };

  const { renderAlert, handleOpenAlert } = useAlert({
    title: 'Discard changes?',
    content: "Your comment will be lost if you don't save it",
    okText: 'Discard',
    onOk: handleClear,
  });

  return (
    <>
      <Box sx={{ mt: 6 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <CommentOutlinedIcon />
          <Typography
            variant="body2"
            component="span"
            sx={{ fontSize: '1rem', textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            Comments
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="flex-start" spacing={1} sx={{ mt: 2 }}>
          <Avatar src={user?.avatar} alt={user?.name} sx={{ width: 32, height: 32 }} />
          <Box sx={{ flex: 1, maxWidth: '100%' }}>
            {addMode ? (
              <>
                <Editor data={comment} onDataChange={handleCommentChange} />
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    disabled={comment === '' || isLoading}
                    sx={{ mt: 2 }}
                    onClick={() => onSave(comment, handleClear)}
                  >
                    {isLoading ? 'Saving' : 'Save'}
                  </Button>
                  <Button onClick={handleCloseEditor}>Cancel</Button>
                </Stack>
              </>
            ) : (
              <Card sx={{ cursor: 'pointer' }} onClick={handleShowHideEditor}>
                <CardContent>
                  <Typography>Write a comment...</Typography>
                </CardContent>
              </Card>
            )}
          </Box>
        </Stack>
      </Box>
      {renderAlert()}
    </>
  );
}

export default CommentEditorView;
