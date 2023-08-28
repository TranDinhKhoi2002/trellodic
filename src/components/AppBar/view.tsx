import { useTheme } from '@mui/styles';
import Box from '@mui/material/Box';
import AppsIcon from '@mui/icons-material/Apps';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Workspaces from './Menus/Workspaces';
import Recent from './Menus/Recent';
import Starred from './Menus/Starred';
import Templates from './Menus/Templates';
import ModeSelect from '@/components/ModeSelect';
import TrelloIcon from '@/common/assets/icons/trello.svg';
import { CustomThemeOptions } from '@/common/styles/theme';
import Profiles from './Menus/Profiles';

function AppBarView() {
  const theme = useTheme<CustomThemeOptions>();

  return (
    <Box
      px={2}
      sx={{
        width: '100%',
        height: theme.customProps.appBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'primary.main' }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: 'primary.main' }} />
          <Typography variant="caption" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'primary.main' }}>
            Trellodic
          </Typography>
        </Box>
        <Workspaces />
        <Recent />
        <Starred />
        <Templates />
        <Button variant="outlined">Create</Button>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField id="outlined-search" label="Search..." type="search" size="small" />
        <ModeSelect />
        <Tooltip title="Notification">
          <Badge color="secondary" variant="dot" sx={{ cursor: 'pointer' }}>
            <NotificationsNoneIcon />
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon />
        </Tooltip>
        <Profiles />
      </Box>
    </Box>
  );
}

export default AppBarView;
