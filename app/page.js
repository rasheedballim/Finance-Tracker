"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItems from "@/components/ExpenseItems";
import { useState } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "@/components/Modal";

ChartJS.register(ArcElement, Tooltip, Legend);

const DUMMY_DATA = [
  {
    id: 1,
    title: "Gas",
    colour: "#009",
    total: 200,
  },
  {
    id: 2,
    title: "Food",
    colour: "#009",
    total: 200,
  },
  {
    id: 3,
    title: "Entertainment",
    colour: "#009",
    total: 200,
  },
  {
    id: 4,
    title: "Car",
    colour: "#009",
    total: 200,
  },
];

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  return (
    <>
      {/*Modal */}
      <Modal show={modalIsOpen} onClose={setModalIsOpen}>
        {" "}
        <h3> Hello WWorld</h3>
      </Modal>

      <main className="container max-w-2xl py-6 px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setModalIsOpen(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button className="btn btn-primary">+ Income</button>
        </section>
        {/*My Expenses */}
        <section className="py-6">
          <h3 className="text-2xl"> My Expenses</h3>
          <div className="flex flex-col gap-2 mt-4">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseItems
                  colour={expense.colour}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>
        <section>
          <h3 className="py-6 px-6">Stats</h3>
          <div className="w-1/2 mx-auto">
            <Doughnut
              data={{
                labels: DUMMY_DATA.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DUMMY_DATA.map((expense) => expense.total),
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
