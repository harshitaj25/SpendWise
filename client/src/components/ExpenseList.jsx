function ExpenseList({ expenses, onDelete, onEdit }) {
    if (expenses.length === 0) {

        return (
            <h2>No expenses found.</h2>
        );

    }
    return (
        <div>

            {expenses.map((expense) => (
                <div
                    key={expense.id}
                    className="expense-card"
                >
                    <h3>{expense.category}</h3>
                    <p>${expense.amount}</p>
                    <p>{expense.date}</p>
                    <p>{expense.note}</p>
                    <button
                        onClick={() => onEdit(expense)}
                    >
                        Edit
                    </button>
                    <button onClick={() => onDelete(expense.id)}>
                        Delete
                    </button>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default ExpenseList;