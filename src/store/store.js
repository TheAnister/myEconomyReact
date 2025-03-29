import { configureStore } from '@reduxjs/toolkit';
import simulatorReducer from './simulatorSlice';

const store = configureStore({
  reducer: {
    simulator: simulatorReducer
  }
});

export default store;
