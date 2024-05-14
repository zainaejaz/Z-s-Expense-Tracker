import Item from "./Item";
import PropTypes from "prop-types";

export default function BudgetItem({ budgetData, handleDeleteSuccess }) {
  // const { id } = budgetData;
  // console.log(id);

  return (
    <>
      {budgetData.map((item) => (
        <Item
          key={item.budgetId}
          item={item}
          handleDeleteSuccess={handleDeleteSuccess}
        />
      ))}
    </>
  );
}

BudgetItem.propTypes = {
  budgetData: PropTypes.array.isRequired,
  handleDeleteSuccess: PropTypes.func.isRequired,
};
