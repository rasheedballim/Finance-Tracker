"use client";
import { currencyFormatter } from "@/lib/utils";
import ExpenseItems from "@/components/ExpenseItems";
import { useState, useRef, useEffect } from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import Modal from "@/components/Modal";
//import { descriptors } from "chart.js/dist/core/core.defaults";

// Firebase
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

//ICONS
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [income, setIncome] = useState([]);
  console.log(income);
  const [showAddIncomeModal, setshowAddIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();

  // handler Functions
  const addIncomeHandler = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };

    try {
      const collectionRef = collection(db, "income");
      const docSnap = await addDoc(collectionRef, newIncome);
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });

      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteIncomeEntryHandler = async (incomeId) => {
    const docRef = doc(db, "income", incomeId);

    try {
      await deleteDoc(docRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getIncomeData = async () => {
      const collectionRef = collection(db, "income");
      const docsSnap = await getDocs(collectionRef);

      const data = docsSnap.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        };
      });
      setIncome(data);
    };
    getIncomeData();
  }, []);
  return (
    <>
      {/* add income Modal */}
      <Modal show={showAddIncomeModal} onClose={setshowAddIncomeModal}>
        {" "}
        <form onSubmit={addIncomeHandler} className="flex flex-col gap-4">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              className="input"
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter Income Amount"
              required
            ></input>
          </div>

          <div className="input-group">
            <label htmlFor="description">Income Amount</label>
            <input
              className="input"
              type="text"
              name="description"
              ref={descriptionRef}
              min={0.01}
              step={0.01}
              placeholder="Enter Income Description"
              required
            ></input>
          </div>
          <button type="submit" className="btn btn-primary ">
            Add Entry
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h3 className=" text-2xl font-bold"> Income History</h3>
          {income.map((i) => {
            return (
              <div className="flex item-center justify-between" key={i.id}>
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteIncomeEntryHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
        ;
      </Modal>

      <main className="container max-w-2xl py-6 px-6 mx-auto">
        <section className="py-3">
          <small className="text-gray-400 text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
          <button onClick={() => {}} className="btn btn-primary">
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
        {/*My Expenses */}
        <section className="py-6">
          <h3 className="text-2xl"> My Expenses</h3>
          <div className="flex flex-col gap-2 mt-4">
            {DUMMY_DATA.map((expense) => {
              return (
                <ExpenseItems
                  key={expense.id}
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
