function ExpenseList({ expenses, onDelete, onEdit }) {
    if (expenses.length === 0) {

        return (
            <h2 className="text-amber-500">No expenses found.</h2>
        );

    }
    return (
        <div>

            {expenses.map((expense) => (
                <div
                    key={expense.id}
                    className="bg-white shadow-md rounded-xl p-5 mb-4 max-w-2xl mx-auto"
                >
                    <h3>{expense.category}</h3>
                    <p>${expense.amount}</p>
                    <p>{expense.date}</p>
                    <p>{expense.note}</p>
                    {/* <button
                        onClick={() => onEdit(expense)}
                    >
                        Edit
                    </button>
                    <button onClick={() => onDelete(expense.id)}>
                        Delete
                    </button> */}
                    <div className="flex flex-col sm:flex-row justify-center gap-3 mt-4">
                        <button
                            onClick={() => onEdit(expense)}
                            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition"
                        >
                            ✏️ Edit
                        </button>

                        <button
                            onClick={() => onDelete(expense.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                        >
                            🗑️ Delete
                        </button>
                    </div>

                </div>
            ))}
        </div>
    );
}

export default ExpenseList;