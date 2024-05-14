import BudgetItem from "./BudgetItem";
import PropTypes from "prop-types";

export default function BudgetTable({ budgetData, handleDeleteSuccess }) {
  return (
    <div>
      <table className="bg-[#FFFFFF] text-cyan-500 border-collapse border-spacing-5 border border-cyan-500 text-center mt-3">
        <thead>
          <tr className="">
            <th className="border border-cyan-500 p-3">Category</th>
            <th className="border border-cyan-500 p-3">Amount</th>
            <th colSpan="2" className="border border-cyan-500">
              Operation
            </th>
          </tr>
        </thead>
        <tbody>
          <BudgetItem
            budgetData={budgetData}
            handleDeleteSuccess={handleDeleteSuccess}
          />
        </tbody>
      </table>
    </div>
  );
}

BudgetTable.propTypes = {
  budgetData: PropTypes.array.isRequired,
  handleDeleteSuccess: PropTypes.func.isRequired,
};
