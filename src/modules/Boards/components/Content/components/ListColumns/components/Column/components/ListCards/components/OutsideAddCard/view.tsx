import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import Tooltip from '@mui/material/Tooltip';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { useTheme } from '@mui/styles';
import { CustomThemeOptions } from '@/common/styles/theme';

type OutsideAddCardViewProps = {
  onShowTextField: () => void;
};

function OutsideAddCardView({ onShowTextField }: OutsideAddCardViewProps) {
  const theme = useTheme<CustomThemeOptions>();

  return (
    <Box
      sx={{
        height: theme.customProps.columnFooterHeight,
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Button startIcon={<AddCardIcon />} onClick={onShowTextField}>
        Add new card
      </Button>
      <Tooltip title="Drag to move">
        <DragHandleIcon sx={{ cursor: 'pointer' }} />
      </Tooltip>
    </Box>
  );
}

export default OutsideAddCardView;
