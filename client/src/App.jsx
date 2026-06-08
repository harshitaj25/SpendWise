import { useEffect, useState } from "react";
import api from "./services/api";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import SummaryCards from "./components/SummaryCards";
import CategoryChart from "./components/CategoryChart";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";

function App() {

  const [user, setUser] =
    useState(null);
  const [darkMode, setDarkMode] =
    useState(false);
  const [showLogin, setShowLogin] =
    useState(true);
  const [selectedCategory, setSelectedCategory] =
    useState("");
  const [search, setSearch] = useState("");
  const [expenses, setExpenses] = useState([]);

  const [summary, setSummary] = useState({});
  const [editingExpense, setEditingExpense] =
    useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] =
    useState(false);


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

    const token =
      localStorage.getItem("token");

    const savedUser =
      localStorage.getItem("user");

    if (savedUser) {

      setUser(
        JSON.parse(savedUser)
      );

    }

    if (token) {

      setIsLoggedIn(true);

      fetchExpenses();
      fetchSummary();

    }

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
      const matchesDate =
        (!startDate ||
          expense.date >= startDate) &&
        (!endDate ||
          expense.date <= endDate);
      return (
        matchesSearch &&
        matchesCategory &&
        matchesDate
      );

    });


  const exportCSV = () => {

    const headers = [
      "Amount",
      "Category",
      "Date",
      "Note"
    ];

    const rows = filteredExpenses.map(
      (expense) => [
        expense.amount,
        expense.category,
        expense.date,
        expense.note
      ]
    );

    const csvContent = [
      headers,
      ...rows
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob(
      [csvContent],
      { type: "text/csv" }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = "expenses.csv";

    link.click();

    window.URL.revokeObjectURL(url);
  };


  if (!isLoggedIn) {

    return showLogin ? (

      <Login
        setIsLoggedIn={setIsLoggedIn}
        setShowLogin={setShowLogin}
      />

    ) : (

      <Signup
        setShowLogin={setShowLogin}
      />

    );

  }
  return (
    <div
      className={`min-h-screen p-6 ${darkMode
        ? "bg-gray-900 text-white"
        : "bg-gray-100 text-black"
        }`}
    >
      <Toaster position="top-right" />
      {/* <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className="bg-gray-700 text-white px-4 py-2 rounded-lg"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
        
      </button> */}
      <h2 className="text-center text-xl mb-2 text-green-400">
        Welcome, {user?.name} 👋
      </h2>
      <div>
        <h1
          style={{
            color: "pink",
            fontSize: "30px",
            textAlign: "center"
          }}
        >
          SpendWise Dashboard
        </h1>
        {/* <button
          onClick={() => {

            localStorage.removeItem("token");
            setIsLoggedIn(false);

          }}
          className="bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button> */}
      </div>
      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${darkMode
          ? "bg-yellow-500 text-black hover:bg-yellow-400"
          : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <ExpenseForm
        darkMode={darkMode}
        onExpenseAdded={refreshData}
        editingExpense={editingExpense}
        setEditingExpense={setEditingExpense}
      />

      <div className="dashboard">
        <SummaryCards summary={summary} />
        <CategoryChart summary={summary} />
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6">

        <button
          onClick={exportCSV}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Export CSV
        </button>
        <input
          type="date"
          value={startDate}
          onChange={(e) =>
            setStartDate(e.target.value)
          }
          className="border p-2 rounded-lg"
        />

        <input
          type="date"
          value={endDate}
          onChange={(e) =>
            setEndDate(e.target.value)
          }
          className="border p-2 rounded-lg"
        />










        <input
          type="text"
          placeholder="Search category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border p-2 rounded-lg bg-white"
        />

        <select
          value={selectedCategory}
          onChange={(e) =>
            setSelectedCategory(e.target.value)
          }
          className="border p-2 rounded-lg bg-white"
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

      </div>
      {/* <Login setIsLoggedIn={setIsLoggedIn} /> */}

      <ExpenseList
        expenses={filteredExpenses}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setIsLoggedIn(false);

        }}
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
}

export default App;