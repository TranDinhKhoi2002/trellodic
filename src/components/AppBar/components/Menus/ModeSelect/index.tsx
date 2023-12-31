import { useColorScheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import { Theme } from '@/common/enums';

function ModeSelect() {
  const { mode, setMode } = useColorScheme();
  const textColor = mode === 'dark' ? '#b6c2cf' : 'white';

  const handleChange = (event: SelectChangeEvent) => {
    const selectedMode = event.target.value as Theme;
    setMode(selectedMode);
  };

  return (
    <FormControl size="small" sx={{ minWidth: '120px' }}>
      <InputLabel id="label-select-dark-light-mode" sx={{ color: textColor, '&.Mui-focused': { color: textColor } }}>
        Mode
      </InputLabel>
      <Select
        labelId="label-select-dark-light-mode"
        id="select-dark-light-mode"
        value={mode}
        label="Mode"
        sx={{
          color: textColor,
          '.MuiOutlinedInput-notchedOutline': { borderColor: textColor },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: textColor },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: textColor },
          '.MuiSvgIcon-root': { color: textColor },
        }}
        onChange={handleChange}
      >
        <MenuItem value={Theme.Light}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize="small" /> Light
          </Box>
        </MenuItem>
        <MenuItem value={Theme.Dark}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize="small" /> Dark
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  );
}

export default ModeSelect;
