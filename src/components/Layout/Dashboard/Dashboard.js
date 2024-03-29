import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import BasicMenu from './menuSesionUser';
import MainListItems from './Sidebar/listCreateElements';
import FullWidthTabs from './Workspace/workspaceVariables';
import Copyrigth from '../copyrigth';
//import Diagrama from './Diagram';
import Diagrama1 from './Diagram2';
import ExportButton from "../../XML/ExportButton";
import Diagrama2 from "../../Forms/Types/Hierarchy";
import {useDispatch, useSelector} from "react-redux";
import {
    selectCurrentProject,
    selectProjectList,
    selectSwitchView,
    selectUserID,
    selectUserImage,
    selectUserName
} from "../../../features/userSlice";


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme(
  {
    palette: {
      primary: {
        main: '#7383d5',
      },
      secondary: {
        main: '#6c747f',
      },
      
    },
  }
);

function DashboardContent() {
  const [open, setOpen] = React.useState(true);
    const dispatch=useDispatch();
    const uid= useSelector(selectUserID);
    const name= useSelector(selectUserName);
    const image= useSelector(selectUserImage);
    const projectList= useSelector(selectProjectList);
    const viewState=useSelector(selectSwitchView);
    const idProject=useSelector(selectCurrentProject).id;
    let view;
    if(viewState==false){
        view=<Diagrama1 />;
    }
    else {
        view=<Diagrama2 />;
    }
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Editor
            </Typography>

            <ExportButton/>


            <BasicMenu />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          
          <MainListItems />
          
          <Divider sx={{ my: 1 }} />
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            
            <Grid container spacing={4} direction="row" justifyContent="center" alignItems="center" >
              <Grid item xs={8}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    //modificar esta linea para aumentar o reducir el tamaño del diagrama
                    height: '85vh',
                  }}
                >
                    {view}
                </Paper>
              </Grid>
              <Grid item xs={4}>
              
                <Paper
                  sx={{
                    p: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 1,
                  }}
                >
                 <FullWidthTabs />
                </Paper>
              </Grid>              
            </Grid>
            
          </Container>
          <Copyrigth sx={{ pt: 4 }} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}