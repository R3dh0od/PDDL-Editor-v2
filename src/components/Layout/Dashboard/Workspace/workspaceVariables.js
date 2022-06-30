import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import EnhancedTable from './TablaDatos';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {

  
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper', width:1}}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          aria-label="full width tabs example"
          //centered
        >
          <Tab label="Types" {...a11yProps(0)} />
          <Tab label="Predicates" {...a11yProps(1)} />
          <Tab label="Functions" {...a11yProps(2)} />
          <Tab label="States" {...a11yProps(3)} />
          <Tab label="Actions" {...a11yProps(4)} />
          <Tab label="Problems" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <EnhancedTable id="Types"/>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <EnhancedTable id="Predicates"/>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <EnhancedTable id="Functions"/>
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <EnhancedTable id="States"/>
        </TabPanel>
        <TabPanel value={value} index={4} dir={theme.direction}>
          <EnhancedTable id="Actions"/>
        </TabPanel>
        <TabPanel value={value} index={5} dir={theme.direction}>
          <EnhancedTable id="Problems"/>
        </TabPanel>
        
      </SwipeableViews>
    </Box>
  );
}