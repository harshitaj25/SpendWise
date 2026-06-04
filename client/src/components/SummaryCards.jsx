function SummaryCards({ summary }) {
    return (
        <div className="flex gap-6 justify-center mb-8">

            <div className="bg-white shadow-md rounded-xl p-6 w-60 text-center">
                <h3 className="text-gray-600 text-lg">
                    Total Spent
                </h3>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                    ${summary.totalSpent || 0}
                </p>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 w-60 text-center">
                <h3 className="text-gray-600 text-lg">
                    Highest Expense
                </h3>

                <p className="text-4xl font-bold text-blue-600 mt-2">
                    ${summary.highestExpense || 0}
                </p>
            </div>

        </div>
    );
}

export default SummaryCards;