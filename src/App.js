import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initialiseEconomy } from './store/simulatorSlice';
import HomeScreen from './components/HomeScreen';
import PeopleView from './components/PeopleView';
import CompaniesView from './components/CompaniesView';
import StocksView from './components/StocksView';
import GovernmentView from './components/GovernmentView';
import StatisticsView from './components/StatisticsView';
import UnemploymentView from './components/UnemploymentView';
import CentralBankView from './components/CentralBankView';
import { Tab, Tabs, Box } from '@mui/material';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Initialise economy state on mount.
    dispatch(initialiseEconomy());
  }, [dispatch]);

  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <header>
        <h1>Economic Simulator</h1>
      </header>
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="Home" />
        <Tab label="People" />
        <Tab label="Companies" />
        <Tab label="Stocks" />
        <Tab label="Government" />
        <Tab label="Statistics" />
        <Tab label="Unemployment" />
        <Tab label="Central Bank" />
      </Tabs>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && <HomeScreen />}
        {tabIndex === 1 && <PeopleView />}
        {tabIndex === 2 && <CompaniesView />}
        {tabIndex === 3 && <StocksView />}
        {tabIndex === 4 && <GovernmentView />}
        {tabIndex === 5 && <StatisticsView />}
        {tabIndex === 6 && <UnemploymentView />}
        {tabIndex === 7 && <CentralBankView />}
      </Box>
      <footer>
        <p>© 2025 myEconomy</p>
      </footer>
    </Box>
  );
}

export default App;
