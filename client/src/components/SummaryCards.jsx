function SummaryCards({ summary }) {
    return (
        <div className="summary-container">

            <div className="card">
                <h3>Total Spent</h3>
                <p>${summary.totalSpent || 0}</p>
            </div>

            <div className="card">
                <h3>Highest Expense</h3>
                <p>${summary.highestExpense || 0}</p>
            </div>

        </div>
    );
}

export default SummaryCards;