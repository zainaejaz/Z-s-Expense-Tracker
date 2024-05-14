import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";

// import {} from "../../";

import BudgetTable from "./BudgetTable";
import {
  income as incomeAction,
  payment as paymentAction,
} from "./budgetSlice";
import { getBudget, insertBudget } from "../services/apiBudget";
import store from "./store";

export default function Budget() {
  const { income, payment } = useSelector((state) => state.budget);
  const dispatch = useDispatch();
  const [budgetData, setBudgetData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: fetchedBudgetData } = useQuery({
    queryKey: ["budget"],
    queryFn: getBudget,
    onSuccess: (data) => {
      // Ensure we sync the budget data from the fetch on initial load
      setBudgetData(data);
    },
  });

  const handleDeleteSuccess = (budgetId, shouldRollback = false) => {
    if (shouldRollback) {
      // In case of rollback, we sync with the server state
      setBudgetData(fetchedBudgetData);
    } else {
      // Otherwise, we optimistically remove the item from the UI
      setBudgetData((currentData) =>
        currentData.filter((item) => item.budgetId !== budgetId)
      );
    }
  };

  const onSubmit = async (data) => {
    try {
      dispatch({ type: "budget/setIsLoading", payload: true });
      if (data.bCategory === "income") {
        await dispatch(incomeAction(parseFloat(data.bAmount)));
      } else {
        await dispatch(paymentAction(parseFloat(data.bAmount)));
      }

      const { income } = store.getState().budget;

      // Check if income is 0 and payment is greater than 0 or if income is less than payment
      if (
        (income === 0 && parseFloat(data.bAmount) > 0) ||
        income < parseFloat(data.bAmount)
      ) {
        console.log("Cannot submit form. Invalid budget.");
        return; // Don't submit form or insert data
      }

      const insertedItem = await insertBudget(data.bName, data.bAmount);
      setBudgetData([
        ...budgetData,
        { ...data, budgetId: insertedItem.budgetId },
      ]);
      reset();
    } catch (error) {
      console.error("Error submitting budget data:", error);
    } finally {
      dispatch({ type: "budget/setIsLoading", payload: false });
    }
  };

  return (
    <div className="min-h-screen min-w-full flex flex-col md:flex-row items-center justify-around bg-[url('../../dist/pexels-eye4dtail-129492.jpg')]">
      <div className="flex items-center justify-center mt-7">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white flex flex-col justify-center items-start rounded-xl p-14 md:mr-8 mb-8 md:mb-0"
        >
          <label className="mb-2">
            Budget Category:
            <input
              type="text"
              id="bName"
              {...register("bName", {
                required: "This field is required",
                minLength: { value: 3, message: "Minimum of 3 characters" },
              })}
              className="border-2 border-indigo-600 mt-3 w-[100%]"
            />
          </label>
          {errors.bName && (
            <span className="text-red-500">{errors.bName.message}</span>
          )}

          <label className="mb-2">
            Budget Amount:
            <input
              type="number"
              id="bAmount"
              {...register("bAmount", {
                required: "This field is required",
                validate: (value) =>
                  value > 0 || "Amount must be greater than 0",
              })}
              className="border-2 border-indigo-600 mt-3 w-[100%]"
            />
          </label>
          {errors.bAmount && (
            <span className="text-red-500">{errors.bAmount.message}</span>
          )}

          <label className="mb-2">
            Category:
            <select
              {...register("bCategory", { required: "This field is required" })}
              className="mt-3 ms-3 bg-cyan-700 text-white p-2 rounded-sm"
            >
              <option value="">Select...</option>
              <option value="income">Income</option>
              <option value="payment">Payment</option>
            </select>
          </label>
          {errors.bCategory && (
            <span className="text-red-500">{errors.bCategory.message}</span>
          )}

          <button
            type="submit"
            className="bg-cyan-700 p-3 rounded-xl mt-2 text-white ms-auto mr-auto"
          >
            Submit
          </button>
        </form>
      </div>
      <div className="bg-cyan-500 p-14 rounded-lg">
        <h1 className="text-white mb-3">Your Expenses List</h1>
        <div className="text-white">
          <h2>Income: {income}</h2>
          <h2>Payment: {payment}</h2>
          <BudgetTable
            budgetData={budgetData}
            handleDeleteSuccess={handleDeleteSuccess}
          />
        </div>
      </div>
    </div>
  );
}
