import { currencyFormatter } from "@/lib/utils";

function ExpenseItems({ colour, title, total }) {
  return (
    <button>
      <div className="flex items-center gap-2 justify-between px-4 py-4 bg-slate-700 rounded-3xl">
        <div className="flex items-center gap-2">
          <div
            className="w-[25px] h-[25px] rounded-full "
            style={{ backgroundColor: colour }}
          />
          <h4 className=" capitalize">{title}</h4>
        </div>
        <p>{currencyFormatter(total)}</p>
      </div>
    </button>
  );
}

export default ExpenseItems;
