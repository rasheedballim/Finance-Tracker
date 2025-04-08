import { useState, useContext } from "react";
import Modal from "../Modal";
import { financeContext } from "@/lib/store/finance-context";

function AddExpensesModal({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { expenses } = useContext(financeContext);
  return (
    <Modal show={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label>Enter an amount</label>
        <input
          type="number"
          min={0.01}
          step={0.01}
          placeholder="Enter an expense amount"
          value={expenseAmount}
          onChange={(e) => {
            setExpenseAmount(e.target.value);
          }}
        />
      </div>

      {/*Expense Categories */}

      <div className="flex flex-col gap-4 mt-6">
        {expenses.map((expense) => {
          return (
            <button
              key={expense.id}
              onClick={() => {
                setSelectedCategory(expense.id);
              }}
            >
              <div
                style={{
                  boxShadow:
                    expense.id === selectedCategory ? "1px 1px 4px" : "none",
                }}
                className="flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl"
              >
                <div className="flex items-center gap-2">
                  {/*Coloured Circle */}
                  <div
                    className="w-[25px] h-[25px] rounded-full"
                    style={{
                      backgroundColor: expense.colour,
                    }}
                  ></div>
                  <h4 className="capitalize">{expense.title}</h4>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}

export default AddExpensesModal;
