import { useEffect, useMemo, useState } from "react";
import "./saved.css";

function Saved({setname}) {
  setname("Saved")
  const initialRecipes = [
    {
      id: 1,
      name: "Leftover Rice Cutlet",
      category: "Snacks",
      savedOn: "20 Nov 2026",
      time: 25,
      difficulty: "Easy",
      servings: 2,
      ingredients: ["Leftover Rice", "Potato", "Vegetables", "Spices"],
      instructions: [
        "Mash the leftover rice and boiled potato.",
        "Add chopped vegetables and spices.",
        "Mix well and shape into cutlets.",
        "Shallow fry until golden brown.",
        "Serve hot with chutney.",
      ],
      favourite: true,
    },
    {
      id: 2,
      name: "Vegetable Roti Roll",
      category: "Lunch",
      savedOn: "18 Nov 2026",
      time: 15,
      difficulty: "Easy",
      servings: 1,
      ingredients: ["Leftover Roti", "Vegetables", "Onion", "Spices"],
      instructions: [
        "Chop the vegetables.",
        "Cook with spices in a pan.",
        "Warm the leftover roti.",
        "Add the vegetable filling.",
        "Roll and serve.",
      ],
      favourite: false,
    },
    {
      id: 3,
      name: "Bengali Vegetable Khichuri",
      category: "Dinner",
      savedOn: "16 Nov 2026",
      time: 30,
      difficulty: "Medium",
      servings: 3,
      ingredients: ["Rice", "Dal", "Vegetables", "Spices"],
      instructions: [
        "Wash the rice and dal.",
        "Cook with vegetables and spices.",
        "Add water as required.",
        "Simmer until soft.",
        "Serve warm.",
      ],
      favourite: true,
    },
  ];

  const defaultFolders = [
    "Breakfast Ideas",
    "Quick Snacks",
    "Bengali Recipes",
    "Family Meals",
  ];

  const [recipes, setRecipes] = useState(() => {
    try {
      const stored = localStorage.getItem("zwk_saved_recipes");
      return stored ? JSON.parse(stored) : initialRecipes;
    } catch {
      return initialRecipes;
    }
  });

  const [folders, setFolders] = useState(() => {
    try {
      const stored = localStorage.getItem("zwk_saved_folders");
      return stored ? JSON.parse(stored) : defaultFolders;
    } catch {
      return defaultFolders;
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      return localStorage.getItem("zwk_cooking_notes") || "";
    } catch {
      return "";
    }
  });

  const [activeTab, setActiveTab] = useState("All Recipes");
  const [activeFolder, setActiveFolder] = useState("");
  const [newFolder, setNewFolder] = useState("");
  const [showFolderInput, setShowFolderInput] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [folderAssignments, setFolderAssignments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("zwk_folder_assignments")) || {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("zwk_saved_recipes", JSON.stringify(recipes));
  }, [recipes]);

  useEffect(() => {
    localStorage.setItem("zwk_saved_folders", JSON.stringify(folders));
  }, [folders]);

  useEffect(() => {
    localStorage.setItem("zwk_cooking_notes", notes);
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(
      "zwk_folder_assignments",
      JSON.stringify(folderAssignments),
    );
  }, [folderAssignments]);

  const favouriteCount = recipes.filter((recipe) => recipe.favourite).length;

  const visibleRecipes = useMemo(() => {
    let result = [...recipes];

    if (activeTab === "Favourites") {
      result = result.filter((recipe) => recipe.favourite);
    }

    if (activeTab === "Recently Saved") {
      result.sort((a, b) => b.id - a.id);
    }

    if (activeFolder) {
      result = result.filter((recipe) =>
        (folderAssignments[recipe.id] || []).includes(activeFolder),
      );
    }

    return result;
  }, [recipes, activeTab, activeFolder, folderAssignments]);

  const toggleFavourite = (id) => {
    setRecipes((current) =>
      current.map((recipe) =>
        recipe.id === id ? { ...recipe, favourite: !recipe.favourite } : recipe,
      ),
    );
  };

  const removeRecipe = (id) => {
    if (!window.confirm("Remove this recipe from your saved library?")) return;

    setRecipes((current) => current.filter((recipe) => recipe.id !== id));

    setFolderAssignments((current) => {
      const updated = { ...current };
      delete updated[id];
      return updated;
    });

    if (selectedRecipe?.id === id) setSelectedRecipe(null);
  };

  const createFolder = () => {
    const name = newFolder.trim();

    if (!name) return;

    if (folders.some((folder) => folder.toLowerCase() === name.toLowerCase())) {
      alert("This folder already exists.");
      return;
    }

    setFolders((current) => [...current, name]);
    setNewFolder("");
    setShowFolderInput(false);
  };

  const deleteFolder = (folder) => {
    if (!window.confirm(`Delete the "${folder}" folder?`)) return;

    setFolders((current) => current.filter((item) => item !== folder));

    setFolderAssignments((current) => {
      const updated = {};
      Object.entries(current).forEach(([id, assigned]) => {
        updated[id] = assigned.filter((item) => item !== folder);
      });
      return updated;
    });

    if (activeFolder === folder) setActiveFolder("");
  };

  const assignFolder = (recipeId, folder) => {
    setFolderAssignments((current) => {
      const existing = current[recipeId] || [];
      const updated = existing.includes(folder)
        ? existing.filter((item) => item !== folder)
        : [...existing, folder];

      return { ...current, [recipeId]: updated };
    });
  };

  const saveNotes = () => {
    localStorage.setItem("zwk_cooking_notes", notes);
    alert("Your cooking notes have been saved.");
  };

  const downloadFile = (filename, content, type = "text/plain") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  const exportAllRecipes = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      recipes,
      folders,
      folderAssignments,
      notes,
    };

    downloadFile(
      "zero-waste-kitchen-backup.json",
      JSON.stringify(backup, null, 2),
      "application/json",
    );
  };

  const exportIndividualRecipe = (recipe) => {
    const content = `
${recipe.name}
Category: ${recipe.category}
Saved on: ${recipe.savedOn}
Preparation time: ${recipe.time} minutes
Difficulty: ${recipe.difficulty}
Servings: ${recipe.servings}

INGREDIENTS
${recipe.ingredients.map((item) => "- " + item).join("\n")}

COOKING INSTRUCTIONS
${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join("\n")}

Generated from SMART CHEF Saved Library.
`;

    downloadFile(
      `${recipe.name.toLowerCase().replaceAll(" ", "-")}.txt`,
      content,
    );
  };

  const printRecipe = (recipe) => {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Please allow pop-ups to print this recipe.");
      return;
    }

    const ingredients = recipe.ingredients
      .map((item) => `<li>${item}</li>`)
      .join("");

    const steps = recipe.instructions
      .map((step) => `<li>${step}</li>`)
      .join("");

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${recipe.name}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 750px;
            margin: 40px auto;
            padding: 20px;
            color: #243c2e;
            line-height: 1.7;
          }
          h1 { color: #216747; }
          h2 { margin-top: 30px; }
          li { margin-bottom: 9px; }
          .meta { color: #64766a; }
          @media print {
            body { margin: 15mm; }
          }
        </style>
      </head>
      <body>
        <h1>${recipe.name}</h1>
        <p class="meta">
          ${recipe.category} · ${recipe.time} minutes ·
          ${recipe.difficulty} · ${recipe.servings} servings
        </p>
        <h2>Ingredients</h2>
        <ul>${ingredients}</ul>
        <h2>Cooking Instructions</h2>
        <ol>${steps}</ol>
        <p>SMART CHEF</p>
        <script>
          window.onload = () => window.print();
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  const shareCollection = async () => {
    const summary = recipes
      .map((recipe) => `${recipe.name} (${recipe.category})`)
      .join("\n");

    const text = `My Zero-Waste Kitchen Recipe Collection\n\n${summary}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Saved Recipes",
          text,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Recipe collection copied to clipboard.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        alert("Unable to share the collection.");
      }
    }
  };

  return (
    <div className="saved-page">
    

      {/* HERO */}
      <section className="saved-hero">
        <span className="saved-eyebrow">PERSONAL RECIPE LIBRARY</span>
        <h1>
          My Saved <span>Recipes.</span>
        </h1>
        <p>Your personal collection of recipes, all in one place.</p>
        <div className="saved-hero-decoration">♡</div>
      </section>

      {/* OVERVIEW */}
      <section className="saved-section">
        <span className="saved-number">01 — RECIPE COLLECTION OVERVIEW</span>
        <div className="saved-stats">
          <div className="saved-stat-card">
            <span className="saved-stat-icon">▤</span>
            <strong>{recipes.length}</strong>
            <p>Total Saved</p>
          </div>

          <div className="saved-stat-card">
            <span className="saved-stat-icon">♡</span>
            <strong>{favouriteCount}</strong>
            <p>Favourites</p>
          </div>
        </div>
      </section>

      {/* LIBRARY */}
      <section className="saved-section saved-library-section">
        <div className="saved-section-heading">
          <div>
            <span className="saved-number">02 — MY RECIPE LIBRARY</span>
            <h2>Your personal recipe collection.</h2>
          </div>
        </div>

        <div className="saved-tabs">
          {["All Recipes", "Favourites", "Recently Saved"].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => {
                setActiveTab(tab);
                setActiveFolder("");
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="saved-recipe-grid">
          {visibleRecipes.length > 0 ? (
            visibleRecipes.map((recipe) => (
              <article className="saved-recipe-card" key={recipe.id}>
                <div className="saved-card-top">
                  <span className="saved-category">{recipe.category}</span>
                  <button
                    className={`saved-favourite ${recipe.favourite ? "liked" : ""}`}
                    onClick={() => toggleFavourite(recipe.id)}
                    aria-label="Toggle favourite"
                  >
                    {recipe.favourite ? "♥" : "♡"}
                  </button>
                </div>

                <div className="saved-recipe-symbol">🍃</div>

                <h3>{recipe.name}</h3>
                <p className="saved-date">Saved on {recipe.savedOn}</p>

                <div className="saved-recipe-meta">
                  <span>◷ {recipe.time} min</span>
                  <span>✦ {recipe.difficulty}</span>
                  <span>♧ {recipe.servings} servings</span>
                </div>

                <div className="saved-card-actions">
                  <button
                    className="saved-view-button"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    View Recipe
                  </button>
                  <button
                    className="saved-remove-button"
                    onClick={() => removeRecipe(recipe.id)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="saved-empty">
              <span>📚</span>
              <h3>No recipes here yet.</h3>
              <p>Your saved recipes will appear in this collection.</p>
              <button
                onClick={() => {
                  setActiveTab("All Recipes");
                  setActiveFolder("");
                }}
              >
                View all saved recipes
              </button>
            </div>
          )}
        </div>
      </section>

      {/* FOLDERS */}
      <section className="saved-section">
        <div className="saved-section-heading">
          <div>
            <span className="saved-number">04 — CUSTOM RECIPE FOLDERS</span>
            <h2>My Collections</h2>
          </div>
          <button
            className="saved-primary-button"
            onClick={() => setShowFolderInput(!showFolderInput)}
          >
            + New Folder
          </button>
        </div>

        {showFolderInput && (
          <div className="saved-new-folder">
            <input
              value={newFolder}
              onChange={(e) => setNewFolder(e.target.value)}
              placeholder="Enter folder name..."
              onKeyDown={(e) => e.key === "Enter" && createFolder()}
            />
            <button onClick={createFolder}>Create Folder</button>
            <button
              className="saved-cancel-button"
              onClick={() => {
                setShowFolderInput(false);
                setNewFolder("");
              }}
            >
              Cancel
            </button>
          </div>
        )}

        <div className="saved-folder-grid">
          {folders.map((folder, index) => (
            <div
              className={`saved-folder-card ${
                activeFolder === folder ? "selected" : ""
              }`}
              key={folder}
            >
              <button
                className="saved-folder-main"
                onClick={() => {
                  setActiveFolder(activeFolder === folder ? "" : folder);
                  setActiveTab("All Recipes");
                }}
              >
                <span>📁</span>
                <strong>{folder}</strong>
                <small>
                  {
                    recipes.filter((recipe) =>
                      (folderAssignments[recipe.id] || []).includes(folder),
                    ).length
                  }{" "}
                  recipes
                </small>
              </button>
              <button
                className="saved-folder-delete"
                onClick={() => deleteFolder(folder)}
                title="Delete folder"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <p className="saved-folder-hint">
          Select a folder to view its recipes. Assign recipes from the recipe
          details window.
        </p>
      </section>

      {/* NOTES */}
      <section className="saved-notes-section">
        <div>
          <span className="saved-number">05 — PERSONAL RECIPE NOTES</span>
          <h2>My Cooking Notes</h2>
          <p>
            Keep your cooking ideas, adjustments and personal reminders here.
          </p>
        </div>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Write your cooking notes here..."
          rows="5"
        />

        <button className="saved-primary-button" onClick={saveNotes}>
          Save Note
        </button>
      </section>

      {/* EXPORT */}
      <section className="saved-section saved-export-section">
        <span className="saved-number">06 — EXPORT & BACKUP</span>
        <h2>Keep your recipes with you.</h2>

        <div className="saved-export-grid">
          <button
            onClick={() => {
              if (recipes.length === 0) {
                alert("No saved recipes to export.");
                return;
              }
              exportAllRecipes();
            }}
          >
            <span>↓</span>
            <strong>Export All Saved Recipes</strong>
            <small>Download your library as a JSON backup</small>
          </button>

          <button onClick={shareCollection}>
            <span>↗</span>
            <strong>Share Recipe Collection</strong>
            <small>Share your saved recipe list</small>
          </button>

          <div className="saved-export-info">
            <span>PDF</span>
            <strong>Download Individual Recipe as PDF</strong>
            <small>Open a recipe and select Print / Save as PDF</small>
          </div>
        </div>
      </section>

      {/* RECIPE DETAILS */}
      {selectedRecipe && (
        <div
          className="saved-modal-overlay"
          onClick={() => setSelectedRecipe(null)}
        >
          <div className="saved-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="saved-modal-close"
              onClick={() => setSelectedRecipe(null)}
            >
              ×
            </button>

            <span className="saved-number">YOUR SAVED RECIPE</span>
            <h2>{selectedRecipe.name}</h2>
            <p className="saved-modal-description">
              {selectedRecipe.category} · {selectedRecipe.time} min ·
              {selectedRecipe.difficulty}
            </p>

            <h3>Ingredients</h3>
            <div className="saved-modal-ingredients">
              {selectedRecipe.ingredients.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <h3>Cooking Instructions</h3>
            <ol className="saved-modal-steps">
              {selectedRecipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>

            <h3>Add to a folder</h3>
            <div className="saved-folder-assignments">
              {folders.map((folder) => (
                <label key={folder}>
                  <input
                    type="checkbox"
                    checked={(
                      folderAssignments[selectedRecipe.id] || []
                    ).includes(folder)}
                    onChange={() => assignFolder(selectedRecipe.id, folder)}
                  />
                  {folder}
                </label>
              ))}
            </div>

            <div className="saved-modal-actions">
              <button
                className="saved-primary-button"
                onClick={() => printRecipe(selectedRecipe)}
              >
                Print / Save as PDF
              </button>
              <button
                className="saved-secondary-button"
                onClick={() => exportIndividualRecipe(selectedRecipe)}
              >
                Download TXT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="saved-footer">
        <div href="/" className="saved-logo">
          🌿 SMART CHEF
        </div>
        <p>Your recipes. Your collection. Your kitchen.</p>
        <small>© 2026 SMART CHEF. All rights reserved.</small>
      </footer>
    </div>
  );
}

export default Saved;
