import { useEffect, useState } from "react";
import api from "./services/api";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import SummaryCards from "./components/SummaryCards";
import CategoryChart from "./components/CategoryChart";

function App() {

  const [selectedCategory, setSelectedCategory] =
    useState("");
  const [search, setSearch] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({});
  const [editingExpense, setEditingExpense] =
    useState(null);

  const refreshData = async () => {
    await fetchExpenses();
    await fetchSummary();
  };
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this expense?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await api.delete(`/expenses/${id}`);

      await refreshData();

    } catch (error) {

      console.log(error);

    }

  };
  const handleEdit = (expense) => {

    console.log("EDIT CLICKED");
    console.log(expense);

    setEditingExpense(expense);

  };

  const fetchSummary = async () => {

    try {

      const response = await api.get("/expenses/summary");

      setSummary(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const fetchExpenses = async () => {

    try {

      const response = await api.get("/expenses");

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchExpenses();
    fetchSummary();

  }, []);
  const filteredExpenses =
    expenses.filter((expense) => {

      const matchesSearch =
        expense.category
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "" ||
        expense.category ===
        selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );

    });

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onExpenseAdded={refreshData}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />
      <div className="dashboard">

        <SummaryCards summary={summary} />

        <CategoryChart summary={summary} />

      </div>
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />
      <select
        value={selectedCategory}
        onChange={(e) =>
          setSelectedCategory(e.target.value)
        }
      >
        <option value="">
          All Categories
        </option>

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
        >
          <option value="">
            All Categories
          </option>

          {[...new Set(
            expenses.map(
              (expense) => expense.category
            )
          )].map((category) => (
            <option
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </select>
      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default App;