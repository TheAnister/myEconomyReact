// src/utils/economicModel.js
//
// This file implements an advanced economic simulation engine in plain JavaScript.
// It generates a state with people, companies, government, central bank, stock market
// and macro history. It then simulates month‐to‐month updates with many interdependent variables.
// All state objects returned are plain objects so they can be safely stored in Redux.

import { v4 as uuidv4 } from 'uuid';

// -----------------------------
// Helper Functions
// -----------------------------
export function formatCurrency(n) {
  if (n >= 1e6) return `£${(n / 1e6).toFixed(2)}mln`;
  if (n >= 1e3) return `£${(n / 1e3).toFixed(2)}k`;
  return `£${n.toFixed(2)}`;
}

export function consumptionFraction(economicGrowth) {
  // People save more in recessions, spend more in booms.
  if (economicGrowth < 0) return 0.70;
  else if (economicGrowth > 0.02) return 0.95;
  else return 0.70 + (economicGrowth / 0.02) * 0.25;
}

// -----------------------------
// Data Generation Functions
// -----------------------------
function generatePeople(num) {
  const people = [];
  const educationLevels = ["None", "GCSE", "A-Level", "Undergraduate", "Postgraduate"];
  for (let i = 0; i < num; i++) {
    people.push({
      id: i + 1,
      age: Math.floor(Math.random() * 47) + 18, // ages 18-64
      education_level: educationLevels[Math.floor(Math.random() * educationLevels.length)],
      risk_tolerance: Math.random(), // 0 to 1
      political_views: ["Left", "Centre", "Right"][Math.floor(Math.random() * 3)],
      crime_tendency: Math.random(),
      migration_interest: Math.random(),
      environmental_awareness: Math.random(),
      cultural_preferences: ["Traditional", "Modern", "Mixed"][Math.floor(Math.random() * 3)],
      net_worth: Math.random() * 900000 + 10000,
      income: Math.random() * 975000 + 25000,
      savings_rate: Math.random() * 0.4 + 0.1,    // 10% to 50%
      spending_rate: Math.random() * 0.5 + 0.3,     // 30% to 80%
      job: Math.random() < 0.75 ? "Employed" : "Unemployed",
      job_satisfaction: Math.random(),
      employer: null, // to be assigned later
      // For simulation:
      skills: {
        business: Math.random(),
        tech: Math.random(),
        healthcare: Math.random(),
        manufacturing: Math.random()
      }
    });
  }
  return people;
}

const companyTypes = {
  "Retail": ["Supermarket", "Convenience Store", "Online Retailer", "Department Store"],
  "Technology": ["Software", "Hardware", "Semiconductor", "AI", "Cloud Services"],
  "Manufacturing": ["Automobile", "Consumer Goods", "Industrial", "Chemicals"],
  "Healthcare": ["Hospital", "Pharmaceutical", "Medical Equipment", "Biotech"],
  "Energy": ["Oil & Gas", "Renewable", "Utilities", "Nuclear"],
  "Finance": ["Bank", "Insurance", "Investment Firm", "Fintech"],
  "Services": ["Consultancy", "Hospitality", "Transportation", "Retail Service"]
};

function generateCompanies(num) {
  const sectors = Object.keys(companyTypes);
  const companies = [];
  for (let i = 0; i < num; i++) {
    const sector = sectors[Math.floor(Math.random() * sectors.length)];
    const compType = companyTypes[sector][Math.floor(Math.random() * companyTypes[sector].length)];
    const basePrice = Math.random() * 90 + 10;
    const revenue = Math.random() * 4900000 + 100000;
    const profit = revenue * (Math.random() * 0.15 + 0.05);
    const employees = Math.floor(Math.random() * 191) + 10;
    const marketCap = revenue * (Math.random() * 40 + 10);
    companies.push({
      id: i + 1,
      sector,
      name: `${sector} Company ${i + 1}`,
      company_type: compType,
      product_price: basePrice,
      wages: Math.random() * 4000 + 1000,
      cost_per_unit: Math.random() * 50 + 5,
      marketing_cost_per_unit: Math.random() * 50 + 1,
      revenue,
      profit,
      employees,
      marketCap,
      stock_price: marketCap / 1e6,
      stock_history: [marketCap / 1e6],
      innovation: Math.random(),
      production_capacity: Math.floor(Math.random() * 9001) + 1000,
      private_investment: Math.random() * 100000
    });
  }
  return companies;
}

// -----------------------------
// Initialisation Function
// -----------------------------
export async function initialiseEconomyData() {
  // Adjust numbers for performance if needed.
  const numPeople = 100000;      // Reduced population for performance
  const numCompanies = 1000;
  const people = generatePeople(numPeople);
  const companies = generateCompanies(numCompanies);

  const totalRevenue = companies.reduce((sum, c) => sum + c.revenue, 0);
  const GDP = totalRevenue / 10;
  const Population = people.length;
  const macroStats = {
    GDP,
    Population,
    "GDP per Capita": Population > 0 ? GDP / Population : 0,
    "Debt % GDP": 0,
    "Deficit % GDP": 0,
    "Unemployment Rate (%)": people.filter(p => p.job === "Unemployed").length / Population * 100,
    "Inflation (%)": 2
  };

  // Government data with detailed spending percentages.
  const government = {
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
    deficitPercentage: 0
  };

  // Central Bank initial settings.
  const centralBank = {
    interestRate: 5,
    inflationTarget: 2,
    history: [{ month: 1, rate: 5 }]
  };

  // Stock market: 20% of companies are public.
  const publicCompanies = companies.filter((_, i) => Math.random() < 0.2);
  const stockMarket = {
    publicCompanies,
    index: 1000,
    indexHistory: [1000]
  };

  // Macro history.
  const macroHistory = {
    GDP: [macroStats.GDP],
    Population: [Population],
    "GDP per Capita": [macroStats["GDP per Capita"]],
    "Debt % GDP": [macroStats["Debt % GDP"]],
    "Deficit % GDP": [macroStats["Deficit % GDP"]],
    "Unemployment Rate (%)": [macroStats["Unemployment Rate (%)"]],
    "Inflation (%)": [macroStats["Inflation (%)"]]
  };

  return {
    people,
    companies,
    macroStats,
    government,
    centralBank,
    stockMarket,
    macroHistory
  };
}

// -----------------------------
// Simulation Function
// -----------------------------
export async function simulateEconomyMonth(currentState) {
  // Create new arrays so we do not mutate frozen state.
  const updatedPeople = currentState.people.map(person => {
    const newAge = person.age + 1 / 12;
    const incomeGrowth = 1 + (Math.random() - 0.005);
    const newIncome = person.income * incomeGrowth;
    const netWorthGrowth = 1 + (Math.random() - 0.005);
    const newNetWorth = person.net_worth * netWorthGrowth;
    // Return new plain object for each person.
    return {
      ...person,
      age: newAge,
      income: newIncome,
      net_worth: newNetWorth
    };
  });

  const updatedCompanies = currentState.companies.map(company => {
    const revChange = 1 + (Math.random() - 0.005);
    const newRevenue = company.revenue * revChange;
    const newProfit = newRevenue * (Math.random() * 0.15 + 0.05);
    const empChange = Math.floor(Math.random() * 3) - 1;
    const newEmployees = Math.max(1, company.employees + empChange);
    const newMarketCap = company.marketCap * revChange;
    const newStockPrice = newMarketCap / 1e6;
    const newStockHistory = [...company.stock_history, newStockPrice];
    const newInnovation = Math.min(1, company.innovation + (Math.random() * 0.01));
    return {
      ...company,
      revenue: newRevenue,
      profit: newProfit,
      employees: newEmployees,
      marketCap: newMarketCap,
      stock_price: newStockPrice,
      stock_history: newStockHistory,
      innovation: newInnovation
    };
  });

  const totalRevenue = updatedCompanies.reduce((sum, c) => sum + c.revenue, 0);
  const GDP = totalRevenue / 10;
  const Population = updatedPeople.length;
  const macroStats = {
    GDP,
    Population,
    "GDP per Capita": Population > 0 ? GDP / Population : 0,
    "Debt % GDP": currentState.government.debtPercentage || 0,
    "Deficit % GDP": currentState.government.deficitPercentage || 0,
    "Unemployment Rate (%)": updatedPeople.filter(p => p.job === "Unemployed").length / Population * 100,
    "Inflation (%)": currentState.macroStats["Inflation (%)"] * (1 + (Math.random() - 0.005))
  };

  // Update government debt and deficit (assume government revenue is 10% of GDP)
  const totalGovSpending = Object.values(currentState.government.spendingPercentages)
    .reduce((sum, perc) => sum + perc, 0) * GDP;
  const deficit = totalGovSpending - (GDP * 0.1);
  let newDebt = (currentState.government.debtPercentage || 0) * GDP + deficit;
  if (newDebt < 0) newDebt = 0;
  const debtPercentage = (newDebt / GDP) * 100;

  // Update central bank policy.
  const currentInflation = macroStats["Inflation (%)"] / 100;
  let newInterestRate = currentState.centralBank.interestRate;
  if (currentInflation > currentState.centralBank.inflationTarget / 100) {
    newInterestRate += 0.5;
  } else {
    newInterestRate = Math.max(1, newInterestRate - 0.5);
  }
  const newCentralBank = {
    ...currentState.centralBank,
    interestRate: newInterestRate,
    history: [...currentState.centralBank.history, { month: currentState.macroHistory.GDP.length + 1, rate: newInterestRate }]
  };

  // Update stock market index.
  const publicCompanies = currentState.stockMarket.publicCompanies;
  const totalPublicCap = publicCompanies.reduce((sum, c) => sum + c.marketCap, 0);
  const newStockIndex = publicCompanies.length ? (totalPublicCap / publicCompanies.length) : 0;
  const newStockMarket = {
    ...currentState.stockMarket,
    index: newStockIndex,
    indexHistory: [...currentState.stockMarket.indexHistory, newStockIndex]
  };

  // Update macro history (create new arrays for each key)
  const newMacroHistory = {};
  for (const key in currentState.macroHistory) {
    newMacroHistory[key] = [...currentState.macroHistory[key], macroStats[key]];
  }

  // Return the new complete state.
  return {
    people: updatedPeople,
    companies: updatedCompanies,
    macroStats,
    government: {
      ...currentState.government,
      debtPercentage: debtPercentage,
      deficitPercentage: (deficit / GDP) * 100
    },
    centralBank: newCentralBank,
    stockMarket: newStockMarket,
    macroHistory: newMacroHistory
  };
}
