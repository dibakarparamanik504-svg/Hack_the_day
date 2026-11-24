
import { useEffect, useMemo, useState } from "react";
import "./tracker.css";

const demoMonthlyData = [
  { month: "Jan", kg: 1.8 },
  { month: "Feb", kg: 2.5 },
  { month: "Mar", kg: 2.1 },
  { month: "Apr", kg: 3.2 },
  { month: "May", kg: 2.8 },
  { month: "Jun", kg: 3.9 },
  { month: "Jul", kg: 3.1 },
  { month: "Aug", kg: 4.2 },
  { month: "Sep", kg: 3.6 },
  { month: "Oct", kg: 4.5 },
  { month: "Nov", kg: 2.4 },
  { month: "Dec", kg: 0 }
];

const demoCategories = [
  { name: "Bread & Roti", value: 25, color: "#d6a75b" },
  { name: "Others", value: 15, color: "#8b9c91" },
  { name: "Rice", value: 35, color: "#57936b" },
  { name: "Vegetables", value: 25, color: "#9cbd78" }
];

const initialHistory = [
  {
    id: 1,
    date: "24 Nov 2026",
    food: "Leftover Rice",
    category: "Rice",
    quantity: 0.5
  },
  {
    id: 2,
    date: "23 Nov 2026",
    food: "Vegetable Curry",
    category: "Vegetables",
    quantity: 0.8
  },
  {
    id: 3,
    date: "21 Nov 2026",
    food: "Leftover Roti",
    category: "Bread & Roti",
    quantity: 0.6
  },
  {
    id: 4,
    date: "20 Nov 2026",
    food: "Cooked Dal",
    category: "Others",
    quantity: 0.5
  }
];

function Tracker() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem("zwk_tracker_history");
      return stored ? JSON.parse(stored) : initialHistory;
    } catch {
      return initialHistory;
    }
  });

  const [monthlyGoal, setMonthlyGoal] = useState(() => {
    try {
      return Number(localStorage.getItem("zwk_monthly_goal")) || 5;
    } catch {
      return 5;
    }
  });

  const [goalInput, setGoalInput] = useState(String(monthlyGoal));
  const [selectedYear, setSelectedYear] = useState("2026");
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [entry, setEntry] = useState({
    food: "",
    category: "Rice",
    quantity: ""
  });

  useEffect(() => {
    localStorage.setItem("zwk_tracker_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("zwk_monthly_goal", String(monthlyGoal));
  }, [monthlyGoal]);

  const totalReused = history.reduce(
    (sum, item) => sum + Number(item.quantity || 0),
    0
  );

  const mealsCreated = history.length;

  // Illustrative calculation assumptions:
  // ₹68 estimated savings per kg and 0.66 kg CO2e per kg reused.
  const estimatedSavings = totalReused * 68;
  const estimatedCO2 = totalReused * 0.66;

  const weeklyTarget = 3.5;
  const weeklyReuse = history.reduce((sum, item) => sum + item.quantity, 0);
  const weeklyProgress = Math.min(
    (weeklyReuse / weeklyTarget) * 100,
    100
  );

  const monthlyProgress = Math.min(
    (totalReused / monthlyGoal) * 100,
    100
  );

  const monthlyData = useMemo(() => {
    const result = demoMonthlyData.map(item => ({ ...item }));

    history.forEach(item => {
      const date = new Date(item.date);
      if (!Number.isNaN(date.getTime()) && date.getFullYear() === Number(selectedYear)) {
        const monthIndex = date.getMonth();
        result[monthIndex].kg += item.quantity;
      }
    });

    return result;
  }, [history, selectedYear]);

  const categoryData = useMemo(() => {
    const totals = {
      "Bread & Roti": 0,
      "Others": 0,
      "Rice": 0,
      "Vegetables": 0
    };

    history.forEach(item => {
      totals[item.category] = (totals[item.category] || 0) + item.quantity;
    });

    const total = Object.values(totals).reduce((sum, value) => sum + value, 0);

    return Object.entries(totals).map(([name, value], index) => ({
      name,
      value: total ? (value / total) * 100 : 0,
      color: demoCategories[index].color
    }));
  }, [history]);

  const addEntry = (e) => {
    e.preventDefault();

    const quantity = Number(entry.quantity);

    if (!entry.food.trim() || !quantity || quantity <= 0) {
      alert("Enter a food name and a valid quantity.");
      return;
    }

    const newRecord = {
      id: Date.now(),
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }),
      food: entry.food.trim(),
      category: entry.category,
      quantity
    };

    setHistory(current => [newRecord, ...current]);
    setEntry({ food: "", category: "Rice", quantity: "" });
    setShowEntryForm(false);
  };

  const deleteEntry = (id) => {
    if (!window.confirm("Delete this food reuse record?")) return;
    setHistory(current => current.filter(item => item.id !== id));
  };

  const saveGoal = (e) => {
    e.preventDefault();

    const value = Number(goalInput);

    if (!value || value <= 0) {
      alert("Enter a valid monthly goal.");
      return;
    }

    setMonthlyGoal(value);
    alert("Monthly goal updated.");
  };

  const exportCSV = () => {
    const rows = [
      ["Date", "Food", "Category", "Food Reused (kg)"],
      ...history.map(item => [
        item.date,
        item.food,
        item.category,
        item.quantity
      ])
    ];

    const csv = rows
      .map(row => row.map(value =>
        `"${String(value).replaceAll('"', '""')}"`
      ).join(","))
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "zero-waste-food-reuse-report.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => window.print();

  const maxMonthlyValue = Math.max(
    ...monthlyData.map(item => item.kg),
    1
  );

  return (
    <div className="tracker-page">

      {/* NAVBAR */}
      <nav className="tracker-navbar">
        <a href="/" className="tracker-logo">
          🌿 ZERO-WASTE <span>KITCHEN AI</span>
        </a>

        <div className="tracker-nav-links">
          <a href="/">HOME</a>
          <a href="/generate">GENERATE</a>
          <a href="/explore">EXPLORE</a>
          <a href="/saved">SAVED</a>
          <a href="/tracker" className="active">TRACKER</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="tracker-hero">
        <div>
          <span className="tracker-eyebrow">SUSTAINABILITY DASHBOARD</span>
          <h1>Track Your Food <span>Waste Impact.</span></h1>
          <p>
            See how your leftover food reuse habits make a difference.
            Every recorded action contributes to your sustainability journey.
          </p>
          <button
            className="tracker-hero-button"
            onClick={() => setShowEntryForm(true)}
          >
            + Record Food Reuse
          </button>
        </div>

        <div className="tracker-hero-art">
          <div className="tracker-hero-circle">🌱</div>
          <span className="tracker-art-label">REUSE · REDUCE · REPEAT</span>
        </div>
      </section>

      {/* OVERALL IMPACT */}
      <section className="tracker-section">
        <span className="tracker-number">01 — OVERALL IMPACT</span>
        <div className="tracker-impact-grid">
          <div className="tracker-impact-card">
            <span>♻</span>
            <strong>{totalReused.toFixed(1)} kg</strong>
            <p>Food Reused</p>
            <small>Based on recorded entries</small>
          </div>

          <div className="tracker-impact-card">
            <span>🍽</span>
            <strong>{mealsCreated}</strong>
            <p>Reuse Records</p>
            <small>Recorded food reuse activities</small>
          </div>

          <div className="tracker-impact-card">
            <span>₹</span>
            <strong>₹{Math.round(estimatedSavings).toLocaleString("en-IN")}</strong>
            <p>Estimated Money Saved</p>
            <small>Illustrative rate: ₹68 per kg</small>
          </div>

          <div className="tracker-impact-card">
            <span>🌍</span>
            <strong>{estimatedCO2.toFixed(2)} kg</strong>
            <p>Estimated CO₂e Avoided</p>
            <small>Illustrative factor: 0.66 kg CO₂e/kg</small>
          </div>
        </div>

        <p className="tracker-disclaimer">
          Estimates are illustrative, not verified measurements. Actual
          savings and environmental impact require suitable local factors,
          food type, quantity and recorded activity.
        </p>
      </section>

      {/* MONTHLY REPORT */}
      <section className="tracker-section tracker-report-section">
        <div className="tracker-section-heading">
          <div>
            <span className="tracker-number">02 — FOOD WASTE REDUCTION REPORT</span>
            <h2>Monthly Food Reuse</h2>
            <p>Illustrative monthly data and recorded activity in kilograms.</p>
          </div>

          <select
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="tracker-chart-card">
          <div className="tracker-chart-legend">
            <span><i /> Food reused (kg)</span>
            <small>Monthly overview</small>
          </div>

          <div className="tracker-bar-chart">
            {monthlyData.map(item => (
              <div className="tracker-bar-column" key={item.month}>
                <span className="tracker-bar-value">
                  {item.kg.toFixed(1)}
                </span>
                <div className="tracker-bar-track">
                  <div
                    className="tracker-bar-fill"
                    style={{
                      height: `${(item.kg / maxMonthlyValue) * 100}%`
                    }}
                  />
                </div>
                <span className="tracker-bar-month">{item.month}</span>
              </div>
            ))}
          </div>
          <div className="tracker-chart-axis">Food reused (kg)</div>
        </div>
      </section>

      {/* WEEKLY PROGRESS */}
      <section className="tracker-section">
        <span className="tracker-number">03 — WEEKLY PROGRESS</span>

        <div className="tracker-week-card">
          <div>
            <span className="tracker-week-label">THIS WEEK</span>
            <h2>{weeklyReuse.toFixed(1)} kg</h2>
            <p>Food reused this week</p>
            <small>
              {weeklyProgress.toFixed(0)}% of your weekly 3.5 kg target
            </small>
          </div>

          <div className="tracker-progress-area">
            <div className="tracker-progress-track">
              <div
                className="tracker-progress-fill"
                style={{ width: `${weeklyProgress}%` }}
              />
            </div>
            <div className="tracker-progress-labels">
              <span>0 kg</span>
              <span>Target: 3.5 kg</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY ANALYSIS */}
      <section className="tracker-section tracker-category-section">
        <span className="tracker-number">04 — FOOD CATEGORY ANALYSIS</span>
        <h2>Which leftovers do you reuse most?</h2>
        <p className="tracker-muted">
          Distribution based on your recorded food reuse categories.
        </p>

        <div className="tracker-category-layout">
          <div className="tracker-donut-wrap">
            <div
              className="tracker-donut"
              style={{
                background: `conic-gradient(
                  ${categoryData.map((item, index) => {
                    const previous = categoryData
                      .slice(0, index)
                      .reduce((sum, category) => sum + category.value, 0);
                    return `${item.color} ${previous}% ${previous + item.value}%`;
                  }).join(",")}
                )`
              }}
            >
              <div className="tracker-donut-center">
                <strong>{totalReused.toFixed(1)}</strong>
                <small>KG REUSED</small>
              </div>
            </div>
          </div>

          <div className="tracker-category-legend">
            {categoryData.map(item => (
              <div className="tracker-category-item" key={item.name}>
                <span
                  className="tracker-category-dot"
                  style={{ background: item.color }}
                />
                <strong>{item.name}</strong>
                <span>{item.value.toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENVIRONMENTAL IMPACT */}
      <section className="tracker-environment-section">
        <div>
          <span className="tracker-number">05 — ENVIRONMENTAL IMPACT</span>
          <h2>Your Green Contribution.</h2>
          <p>
            Small food reuse actions can contribute to a more sustainable
            kitchen.
          </p>
        </div>

        <div className="tracker-environment-grid">
          <div>
            <span>♻</span>
            <strong>{totalReused.toFixed(1)} kg</strong>
            <small>Food reuse recorded</small>
          </div>

          <div>
            <span>🌍</span>
            <strong>{estimatedCO2.toFixed(2)} kg</strong>
            <small>Estimated CO₂e avoided</small>
          </div>

          <div>
            <span>💰</span>
            <strong>₹{Math.round(estimatedSavings)}</strong>
            <small>Estimated savings</small>
          </div>

          <div>
            <span>🌱</span>
            <strong>{monthlyProgress.toFixed(0)}%</strong>
            <small>Monthly goal progress</small>
          </div>
        </div>
      </section>

      {/* PERSONAL GOALS */}
      <section className="tracker-section">
        <span className="tracker-number">06 — PERSONAL GOALS</span>
        <div className="tracker-goal-card">
          <div>
            <h2>Set Your Monthly Goal</h2>
            <p>Choose how much leftover food you want to reuse every month.</p>

            <form className="tracker-goal-form" onSubmit={saveGoal}>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={goalInput}
                onChange={e => setGoalInput(e.target.value)}
                required
              />
              <span>kg / month</span>
              <button type="submit">Set My Goal</button>
            </form>
          </div>

          <div className="tracker-goal-progress">
            <span>YOUR MONTHLY PROGRESS</span>
            <strong>{monthlyProgress.toFixed(0)}%</strong>
            <div className="tracker-progress-track">
              <div
                className="tracker-progress-fill"
                style={{ width: `${monthlyProgress}%` }}
              />
            </div>
            <small>
              {totalReused.toFixed(1)} kg of {monthlyGoal} kg
            </small>
          </div>
        </div>
      </section>

      {/* HISTORY */}
      <section className="tracker-section tracker-history-section">
        <div className="tracker-section-heading">
          <div>
            <span className="tracker-number">07 — REPORTS & HISTORY</span>
            <h2>Your Food Reuse History.</h2>
            <p>Review and manage your recorded activities.</p>
          </div>

          <div className="tracker-history-actions">
            <button onClick={exportCSV}>↓ Export CSV</button>
            <button onClick={printReport}>Print / Save PDF</button>
          </div>
        </div>

        <div className="tracker-table-wrap">
          <table className="tracker-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Food Item</th>
                <th>Category</th>
                <th>Food Reused</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map(item => (
                <tr key={item.id}>
                  <td>{item.date}</td>
                  <td>{item.food}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity.toFixed(1)} kg</td>
                  <td>
                    <button
                      className="tracker-delete-button"
                      onClick={() => deleteEntry(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {history.length === 0 && (
                <tr>
                  <td colSpan="5" className="tracker-no-records">
                    No food reuse records available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ADD RECORD MODAL */}
      {showEntryForm && (
        <div
          className="tracker-modal-overlay"
          onClick={() => setShowEntryForm(false)}
        >
          <form
            className="tracker-entry-modal"
            onSubmit={addEntry}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              className="tracker-modal-close"
              onClick={() => setShowEntryForm(false)}
            >
              ×
            </button>

            <span className="tracker-number">RECORD YOUR ACTIVITY</span>
            <h2>Food Reuse Entry</h2>
            <p>Enter the quantity of leftover food you reused.</p>

            <label>Food item</label>
            <input
              type="text"
              placeholder="e.g. Leftover rice"
              value={entry.food}
              onChange={e => setEntry({ ...entry, food: e.target.value })}
              required
            />

            <label>Food category</label>
            <select
              value={entry.category}
              onChange={e => setEntry({ ...entry, category: e.target.value })}
            >
              <option>Rice</option>
              <option>Vegetables</option>
              <option>Bread & Roti</option>
              <option>Others</option>
            </select>

            <label>Quantity reused (kg)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              placeholder="e.g. 0.5"
              value={entry.quantity}
              onChange={e => setEntry({ ...entry, quantity: e.target.value })}
              required
            />

            <button type="submit" className="tracker-submit-button">
              Save Food Reuse Record
            </button>
          </form>
        </div>
      )}

      {/* FOOTER */}
      <footer className="tracker-footer">
        <a href="/" className="tracker-logo">🌿 ZERO-WASTE KITCHEN AI</a>
        <p>Every leftover reused is a step towards less food waste.</p>
        <small>© 2026 ZERO-WASTE KITCHEN AI. All rights reserved.</small>
      </footer>

    </div>
  );
}

export default Tracker;
