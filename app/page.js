"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseCategoryItem from "@/components/ExpenseCategoryItem";
import { useState, useContext, useEffect } from "react";
import { financeContext } from "@/lib/store/finance-context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import AddExpensesModal from "@/components/modals/AddExpensesModal";
import AddIncomeModal from "@/components/modals/AddIncomeModal";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setshowAddExpenseModal] = useState(false);

  const [balance, setBalance] = useState(0);
  const { expenses, income } = useContext(financeContext);
  useEffect(() => {
    const newBalance =
      income.reduce((total, i) => {
        return total + i.amount;
      }, 0) -
      expenses.reduce((total, e) => {
        return total + e.total;
      }, 0);

    setBalance(newBalance);
  }, [expenses, income]);

  return (
    <>
      {/*Add Income Modal */}
      <AddIncomeModal
        show={showAddIncomeModal}
        onClose={setshowAddIncomeModal}
      ></AddIncomeModal>
      {/*Add Expenses Modal */}
      <AddExpensesModal
        show={showAddExpenseModal}
        onClose={setshowAddExpenseModal}
      ></AddExpensesModal>

      <main className="container max-w-2xl py-6 px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setshowAddExpenseModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setshowAddIncomeModal(true);
            }}
            className="btn btn-primary"
          >
            + Incomeee
          </button>
        </section>
         {/* Expenses */}
         <section className="py-6">
          <h3 className="text-2xl">My Expenses</h3>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return <ExpenseCategoryItem key={expense.id} expense={expense} />;
            })}
          </div>
        </section>

        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: ["#000F"],
                    borderWidth: 5,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
