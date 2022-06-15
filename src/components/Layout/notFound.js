import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function NotFound() {
    

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PriorityHighOutlinedIcon fontSize='large' />
          </Avatar>
          <Typography component="h1" variant="h5">
            ERROR 404: PAGE NOT FOUND
          </Typography>
          
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}