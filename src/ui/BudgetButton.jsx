import PropTypes from "prop-types";

export default function BudgetButton({ className, children, onClick }) {
  return (
    <button type="submit" className={className} onClick={onClick}>
      {children}
    </button>
  );
}

BudgetButton.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
