import supabase from "./superbase";
import { v4 as uuidv4 } from "uuid";

//get budget row
export async function getBudget() {
  let { data, error } = await supabase.from("budget").select("*");

  if (error) {
    console.error(error);
    throw new Error("Budget could not be loaded");
  }
  return data;
}

export async function getBudgetData() {
  let { data, error } = await supabase.from("budgetAmount").select("*");

  if (error) {
    console.error(error);
    throw new Error("Budget could not be loaded");
  }

  console.log(data);
  // Aggregate income and payment
  // const result = data.reduce(
  //   (acc, row) => {
  //     acc.income += row.income || 0;
  //     acc.payment += row.payment || 0;
  //     return acc;
  //   },
  //   { income: 0, payment: 0 }
  // );

  // return result;
}

//get budgetAmount data(payment and income)
export async function insertBudget(bName, bAmount) {
  const budgetId = uuidv4(); // Generate a random ID
  const { data, error } = await supabase
    .from("budget")
    .insert([{ budgetId, bName, bAmount }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Budget could not be inserted");
  }
  return data;
}

//insert budget row
export async function insertBudgetData(income, payment) {
  const budgetId = uuidv4(); // Generate a random ID
  const { data, error } = await supabase
    .from("budgetAmount")
    .insert([{ income, payment, budgetId }])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("BudgetAmount could not be inserted");
  }
  return data;
}

//delete budget row

export async function deleteBudget(budgetId) {
  const { data, error } = await supabase
    .from("budget")
    .delete()
    .eq("budgetId", budgetId);

  if (error) {
    console.error(error);
    throw new Error("Budget could not be deleted");
  }
  return data;
}

export async function deleteBudgetData(budgetId) {
  const { data, error } = await supabase
    .from("budgetAmount")
    .delete()
    .eq("budgetId", budgetId);

  if (error) {
    console.error(error);
    throw new Error("Budget could not be deleted");
  }
  return data;
}

export async function updateBudget(budgetId, bName) {
  const { data, error } = await supabase
    .from("budget")
    .update({ bName })
    .eq("budgetId", budgetId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Budget could not be updated");
  }
  return data;
}
