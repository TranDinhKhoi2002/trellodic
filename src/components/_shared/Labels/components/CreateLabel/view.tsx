import { useRef } from 'react';
import { TextField, Typography, Button } from '@/components/UIElements';
import Colors from '@/components/Colors';

type CreateLabelViewProps = {
  selectedColor: string;
  isPending: boolean;
  onSelectColorChange: (_color: string) => void;
  onCreate: (_title: string, _color: string) => void;
};

function CreateLabelView({ selectedColor, isPending, onSelectColorChange, onCreate }: CreateLabelViewProps) {
  const titleRef = useRef<HTMLInputElement>(null);

  const handleCreateLabel = () => {
    onCreate(titleRef.current?.value || '', selectedColor);
  };

  return (
    <>
      <TextField inputRef={titleRef} fullWidth size="small" placeholder="Title" sx={{ marginTop: '20px' }} />
      <Typography sx={{ my: 2 }}>Select a color</Typography>
      <Colors selectedColor={selectedColor} onSelect={onSelectColorChange} />
      <Button variant="contained" loading={isPending} sx={{ mt: 2 }} onClick={handleCreateLabel}>
        Create
      </Button>
    </>
  );
}

export default CreateLabelView;
