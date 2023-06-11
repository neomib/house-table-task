import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import 'react-notifications/lib/notifications.css';
import { RouterProvider } from 'react-router';
import { router } from './routes';
const { NotificationContainer } = require('react-notifications');

function App() {
  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <AppBar position="sticky" sx={{ top: 0, }}>
        <Toolbar>
          <Link href="/" underline="none">
            <Typography variant="h6" sx={{ color: "white" }} >
              HouseTable
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box display="flex" flex={1} sx={{ background: "#f5f5f5" }}>
        <RouterProvider router={router} />
        <NotificationContainer />
      </Box>


    </Box>
  );
}

export default App;
