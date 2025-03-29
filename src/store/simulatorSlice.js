import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { initialiseEconomyData, simulateEconomyMonth, formatCurrency, consumptionFraction } from '../utils/economicModel';


// Async thunk to initialise the economy
export const initialiseEconomy = createAsyncThunk(
  'simulator/initialiseEconomy',
  async (_, { rejectWithValue }) => {
    try {
      const data = await initialiseEconomyData();
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// Async thunk to simulate the next month
export const simulateNextMonth = createAsyncThunk(
  'simulator/simulateNextMonth',
  async (_, { getState, rejectWithValue }) => {
    try {
      const currentState = getState().simulator;
      const update = await simulateEconomyMonth(currentState);
      return update;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  people: [],
  companies: [],
  government: {
    corporateTaxRate: 25,
    salesTaxRate: 15,
    spendingPercentages: {
      healthcare: 5,
      education: 4,
      research: 3,
      welfare: 8,
      transportation: 6,
      energy: 4,
      defence: 7,
      infrastructure: 5,
    },
    debtPercentage: 0,
    deficitPercentage: 0,
  },
  centralBank: {
    interestRate: 5,
    inflationTarget: 2,
    history: [{ month: 1, rate: 5 }],
  },
  stockMarket: {
    publicCompanies: [],
    index: 1000,
    indexHistory: [1000],
  },
  macroStats: {
    GDP: 2000000000,
    Population: 1000000,
    "GDP per Capita": 2000,
    "Debt % GDP": 0,
    "Deficit % GDP": 0,
    "Unemployment Rate (%)": 5,
    "Inflation (%)": 2,
  },
  macroHistory: {
    GDP: [2000000000],
    Population: [1000000],
    "GDP per Capita": [2000],
    "Debt % GDP": [0],
    "Deficit % GDP": [0],
    "Unemployment Rate (%)": [5],
    "Inflation (%)": [2],
  }
};

const simulatorSlice = createSlice({
  name: 'simulator',
  initialState,
  reducers: {
    updateGovernmentPolicy: (state, action) => {
      const { corporateTax, salesTax, spending } = action.payload;
      state.government.corporateTaxRate = corporateTax;
      state.government.salesTaxRate = salesTax;
      state.government.spendingPercentages = spending;
    },
    adjustInterestRate: (state, action) => {
      state.centralBank.interestRate = action.payload;
      const month = state.macroHistory.GDP.length + 1;
      state.centralBank.history.push({ month, rate: state.centralBank.interestRate });
    },
    investInCompany: (state, action) => {
      const { personId, companyId, amount } = action.payload;
      const person = state.people.find(p => p.id === personId);
      const company = state.companies.find(c => c.id === companyId);
      if (person && company && person.savings >= amount) {
        person.savings -= amount;
        company.marketCap += amount;
        const publicComp = state.stockMarket.publicCompanies.find(c => c.id === companyId);
        if (publicComp) {
          publicComp.stock_price = company.marketCap / 1e6;
          publicComp.stock_history.push(publicComp.stock_price);
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initialiseEconomy.fulfilled, (state, action) => {
        const {
          people,
          companies,
          macroStats,
          government,
          centralBank,
          stockMarket,
          macroHistory
        } = action.payload;
        state.people = people;
        state.companies = companies;
        state.macroStats = macroStats;
        state.government = government;
        state.centralBank = centralBank;
        state.stockMarket = stockMarket;
        state.macroHistory = macroHistory;
      })
      .addCase(simulateNextMonth.fulfilled, (state, action) => {
        const {
          people,
          companies,
          macroStats,
          government,
          centralBank,
          stockMarket,
          macroHistory
        } = action.payload;
        state.people = people;
        state.companies = companies;
        state.macroStats = macroStats;
        state.government = government;
        state.centralBank = centralBank;
        state.stockMarket = stockMarket;
        for (const metric in macroHistory) {
          if (!state.macroHistory[metric]) {
            state.macroHistory[metric] = [];
          }
          state.macroHistory[metric].push(macroHistory[metric]);
        }
      });
  }
});

export const { updateGovernmentPolicy, adjustInterestRate, investInCompany } = simulatorSlice.actions;
export default simulatorSlice.reducer;
