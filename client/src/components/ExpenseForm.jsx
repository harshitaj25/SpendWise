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
        <form onSubmit={handleSubmit}>

            <h2>Add Expense</h2>

            <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            <input
                type="text"
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />

            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />

            <input
                type="text"
                placeholder="Note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
            />

            <button type="submit">
                {editingExpense
                    ? "Update Expense"
                    : "Add Expense"}
            </button>
        </form>
    );
}

export default ExpenseForm;