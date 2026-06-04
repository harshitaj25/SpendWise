import { useEffect, useState } from "react";
import api from "../services/api";

function ExpenseForm({
    onExpenseAdded,
    editingExpense,
    setEditingExpense
}) {

    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [note, setNote] = useState("");
    useEffect(() => {

        if (editingExpense) {

            setAmount(editingExpense.amount);
            setCategory(editingExpense.category);
            setDate(editingExpense.date);
            setNote(editingExpense.note);

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    }, [editingExpense]);


    const handleSubmit = async (e) => {

        e.preventDefault();
        if (!amount || !category.trim() || !date) {
            alert("Please fill all required fields");
            return;
        }

        try {

            if (editingExpense) {

                await api.put(`/expenses/${editingExpense.id}`, {
                    amount,
                    category,
                    date,
                    note,
                });

            } else {

                await api.post("/expenses", {
                    amount,
                    category,
                    date,
                    note,
                });

            }

            await onExpenseAdded();

            setAmount("");
            setCategory("");
            setDate("");
            setNote("");

            setEditingExpense(null);

            alert(
                editingExpense
                    ? "Expense Updated!"
                    : "Expense Added!"
            );

        } catch (error) {

            console.log(error);

        }

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 mb-8 max-w-5xl mx-auto"
        >
            <h2 className="text-2xl font-bold text-center mb-6">
                {editingExpense
                    ? "Edit Expense"
                    : "Add Expense"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="text"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            <div className="flex justify-center mt-6">

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                >
                    {editingExpense
                        ? "Update Expense"
                        : "Add Expense"}
                </button>

            </div>
        </form>
    );
}

export default ExpenseForm;