import { useRef } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';

type AddColumnSectionViewProps = {
  isPending: boolean;
  onHideTextField: () => void;
  onAddColumn: (_cardTitle: string) => void;
};

function AddColumnSectionView({ isPending, onHideTextField, onAddColumn }: AddColumnSectionViewProps) {
  const textFieldRef = useRef<HTMLInputElement>();

  const handleAddColumn = () => {
    if (!textFieldRef.current || !textFieldRef.current?.value) {
      textFieldRef.current?.focus();
      return;
    }
    onAddColumn(textFieldRef.current.value);
  };

  return (
    <Card sx={{ p: '10px', borderRadius: '6px', boxShadow: 'unset' }}>
      <TextField
        sx={{ input: { color: 'white' } }}
        fullWidth
        autoFocus
        placeholder="Enter a title for this column..."
        multiline
        minRows={4}
        maxRows={8}
        inputRef={textFieldRef}
      />
      <Stack direction="row" sx={{ mt: 1 }} spacing={1}>
        <Button variant="contained" disabled={isPending} onClick={handleAddColumn}>
          {isPending ? 'Adding...' : 'Add column'}
        </Button>
        <Button onClick={onHideTextField}>
          <CloseIcon />
        </Button>
      </Stack>
    </Card>
  );
}

export default AddColumnSectionView;
