import { ChangeEvent } from 'react';
import { Box, Card, Checkbox, Chip, Stack, Typography } from '@/components/UIElements';
import { withBoard, BoardGlobalProps } from '@/hocs';
import { isExpired } from '@/utils/card';

type DatesViewProps = BoardGlobalProps & {
  isLoading: boolean;
  onCheckDone: (_isDone: boolean) => void;
};

function DatesView({ card, isLoading, onCheckDone }: DatesViewProps) {
  const isDone = card.isDone;

  const handleCheckDone = (e: ChangeEvent<HTMLInputElement>) => {
    onCheckDone(e.target.checked);
  };

  const renderTag = () => {
    if (isDone) {
      return <Chip label="Completed" color="success" size="small" />;
    }

    if (isExpired(card.endDate)) {
      return <Chip label="Overdue" color="error" size="small" />;
    }
    return <Chip label="In Progress" color="info" size="small" />;
  };

  if (!card.endDate) {
    return <></>;
  }

  return (
    <Box>
      <Typography sx={{ mb: 1, fontWeight: 500 }}>Due date</Typography>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Checkbox defaultChecked={isDone} disabled={isLoading} onChange={handleCheckDone} />
        <Card
          sx={{
            display: 'flex',
            alignItems: 'center',
            py: 1,
            px: 2,
            minWidth: '180px',
            borderRadius: '4px',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2} sx={{ flex: 1 }}>
            <Typography sx={{ flex: 1 }}>{new Date(card.endDate).toLocaleDateString()}</Typography>
            {renderTag()}
          </Stack>
        </Card>
      </Stack>
    </Box>
  );
}

export default withBoard(DatesView);
