import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBudget, deleteBudget } from "../services/apiBudget";
import BudgetButton from "../ui/BudgetButton";
import { useDispatch } from "react-redux";
import {
  deductIncome,
  deductPayment,
  income as incomeAction,
  payment as paymentAction,
} from "./budgetSlice";
import PropTypes from "prop-types";

export default function Item({ item, handleDeleteSuccess }) {
  const [editedName, setEditedName] = useState(item.bName);
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  // const { income, payment } = useSelector((state) => state.budget);

  const { isLoading: isUpdating, mutate: updateMutation } = useMutation({
    mutationFn: ([budgetId, bName]) => updateBudget(budgetId, bName),
    onSuccess: () => {
      alert("Budget successfully updated");
      queryClient.invalidateQueries(["budget"]);
      setIsEditing(false);
    },
    onError: (err) => {
      alert(err.message);
    },
  });

  const handleSave = async () => {
    await updateMutation([item.budgetId, editedName]);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const { isLoading: isDeleting, mutate: deleteMutation } = useMutation({
    mutationFn: () => deleteBudget(item.budgetId),
    onMutate: async () => {
      // Optimistically remove the item from the UI
      handleDeleteSuccess(item.budgetId);

      // Optimistically update the Redux store
      if (item.bCategory === "income") {
        dispatch(deductIncome(parseFloat(item.bAmount)));
      } else if (item.bCategory === "payment") {
        dispatch(deductPayment(parseFloat(item.bAmount)));
      }

      return { previousItem: item };
    },
    onError: (err, variables, context) => {
      // Rollback optimistic updates if there's an error
      alert(err.message);

      handleDeleteSuccess(context.previousItem.budgetId, true);
      if (context.previousItem.bCategory === "income") {
        dispatch(incomeAction(parseFloat(context.previousItem.bAmount)));
      } else {
        dispatch(paymentAction(parseFloat(context.previousItem.bAmount)));
      }
    },
    onSuccess: () => {
      alert("Budget successfully deleted");
      // Invalidate and refetch the budget data to keep in sync with the server
      queryClient.invalidateQueries(["budget"]);
    },
  });

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?"
    );
    if (confirmDelete) {
      await deleteMutation();
    }
  };

  return (
    <tr>
      <td className="border border-cyan-500 p-2">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        ) : (
          editedName
        )}
      </td>
      <td className="border border-cyan-500">{item.bAmount}</td>
      <td className="border border-cyan-500">
        {isEditing ? (
          <BudgetButton
            onClick={handleSave}
            className="bg-[#FFFF00] p-2 m-3 rounded-lg text-cyan-700"
          >
            Save
          </BudgetButton>
        ) : (
          <BudgetButton
            onClick={handleEdit}
            className="bg-[#FFFF00] p-2 m-3 rounded-lg text-cyan-700"
          >
            Edit
          </BudgetButton>
        )}
      </td>
      <td className="border border-cyan-500">
        <BudgetButton
          onClick={handleDelete}
          className="bg-[#FF0000] p-2 m-3 rounded-lg text-[#FFFFFF]"
          disabled={isUpdating || isDeleting}
        >
          Delete
        </BudgetButton>
      </td>
    </tr>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  handleDeleteSuccess: PropTypes.func.isRequired,
};
