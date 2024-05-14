import { createSlice } from "@reduxjs/toolkit";
import { insertBudgetData } from "../services/apiBudget";
import toast from "react-hot-toast";

const initialState = {
  income: 0,
  payment: 0,
  isLoading: false,
  isError: false,
};

const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    income(state, action) {
      state.income += action.payload; // Update income by adding the payload

      insertBudgetData(state.income, state.payment);
    },
    payment(state, action) {
      if (state.income === 0 || state.income < state.payment + action.payload) {
        toast.error("You dont have income now to pay any payment");
        return;
      }
      state.income -= action.payload; // Deduct payment from income
      state.payment += action.payload; // Add payment to the payment state
      insertBudgetData(state.income, state.payment);
    },
    deductIncome(state, action) {
      state.income -= action.payload; // Update income by adding the payload
      insertBudgetData(state.income, state.payment);
    },
    deductPayment(state, action) {
      if (state.income === 0 || state.income < state.payment + action.payload) {
        toast.error("You dont have income now to pay any payment");
        return;
      }
      state.payment -= action.payload; // Update income by adding the payload
      insertBudgetData(state.income, state.payment);
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIncomeAndPayment(state, action) {
      state.income = action.payload.income;
      state.payment = action.payload.payment;
    },
  },
});

export const {
  income,
  payment,
  setIsLoading,
  setIncomeAndPayment,
  deductIncome,
  deductPayment,
} = budgetSlice.actions;

export default budgetSlice.reducer;
