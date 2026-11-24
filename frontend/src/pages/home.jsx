import React from "react";
import "./home.css";

const recipes = [
  {
    number: "01",
    name: "Leftover Rice Cutlet",
    description: "Turn cooked rice and everyday vegetables into crisp, flavourful cutlets.",
    ingredients: "Cooked rice · Vegetables · Spices",
    tag: "Crispy & comforting",
  },
  {
    number: "02",
    name: "Vegetable Fried Rice",
    description: "Give extra vegetables and yesterday's rice a quick, delicious second life.",
    ingredients: "Cooked rice · Mixed vegetables · Soy sauce",
    tag: "Quick meal",
  },
  {
    number: "03",
    name: "Roti Noodles",
    description: "Transform leftover rotis into a fun noodle-style meal with fresh vegetables.",
    ingredients: "Leftover roti · Vegetables · Seasoning",
    tag: "Creative reuse",
  },
];

function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Zero-Waste Kitchen AI home">
          <span className="brand-mark">ZW</span>
          <span className="brand-name">ZERO-WASTE <b>KITCHEN AI</b></span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-link active" href="#home">HOME</a>
          <a className="nav-link" href="/generate">GENERATE</a>
          <a className="nav-link" href="/explore">EXPLORE</a>
          <a className="nav-link" href="/saved">SAVED</a>
          <a className="nav-link" href="/tracker">TRACKER</a>
        </nav>

        <a className="header-cta" href="/generate">Try AI <span aria-hidden="true">↗</span></a>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> AI-POWERED FOOD INNOVATION</div>
            <h1>Don't Waste Food.<br /><span>Create Something</span><br />Delicious.</h1>
            <p className="hero-description">
              Turn your leftover food into creative meals with the power of Gemini AI.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="/generate">Start Cooking with AI <span aria-hidden="true">→</span></a>
              <a className="text-link" href="#how-it-works">See how it works <span aria-hidden="true">↓</span></a>
            </div>
            <div className="hero-traits">
              <span>Smart</span><i /> <span>Sustainable</span><i /> <span>Creative</span>
            </div>
          </div>

          <div className="hero-art" aria-label="Illustration of a sustainable kitchen bowl">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-leaf leaf-one">✳</div>
            <div className="art-leaf leaf-two">✦</div>
            <div className="art-card card-top"><span className="mini-icon">↗</span><span>Waste less</span></div>
            <div className="bowl-wrap">
              <div className="bowl-shadow" />
              <div className="bowl">
                <div className="bowl-food">
                  <span className="food food-one" /><span className="food food-two" />
                  <span className="food food-three" /><span className="food food-four" />
                  <span className="food food-five" /><span className="food food-six" />
                </div>
              </div>
              <div className="bowl-base" />
            </div>
            <div className="art-card card-bottom"><span className="mini-check">✓</span><span>More taste</span></div>
            <div className="art-caption">A little creativity can<br />make a big difference.</div>
          </div>
          <div className="hero-index">01 <span>/ 05</span></div>
        </section>

        <section className="intro-section section-pad">
          <div className="section-kicker">01 — WELCOME TO ZERO-WASTE KITCHEN</div>
          <div className="intro-grid">
            <h2>Give leftovers<br /><span>a second life.</span></h2>
            <div className="intro-text">
              <p>Discover how everyday leftover ingredients can become delicious meals. With a little imagination and AI-powered guidance, what you already have can become something worth looking forward to.</p>
              <div className="statement"><span className="statement-line" />LESS WASTE. MORE TASTE.</div>
            </div>
          </div>
        </section>

        <section className="how-section section-pad" id="how-it-works">
          <div className="section-heading">
            <div>
              <div className="section-kicker">02 — SIMPLE BY DESIGN</div>
              <h2>How it <span>works.</span></h2>
            </div>
            <p>Three simple steps take your leftovers<br className="desktop-break" /> from fridge to fresh inspiration.</p>
          </div>
          <div className="steps-grid">
            <article className="step-card">
              <div className="step-top"><span>STEP 01</span><span className="step-symbol">＋</span></div>
              <div className="step-illustration ingredient-illustration"><span className="ingredient-circle">＋</span><span className="ingredient-chip chip-a">Rice</span><span className="ingredient-chip chip-b">Veggies</span></div>
              <h3>Add Leftovers</h3>
              <p>Upload a food photo or enter the ingredients you have available.</p>
            </article>
            <article className="step-card featured-step">
              <div className="step-top"><span>STEP 02</span><span className="step-symbol">✳</span></div>
              <div className="step-illustration analysis-illustration"><div className="scan-ring"><span>AI</span></div><span className="scan-dot dot-a" /><span className="scan-dot dot-b" /><span className="scan-dot dot-c" /></div>
              <h3>AI Analysis</h3>
              <p>Gemini analyses the ingredients and provides relevant food-safety guidance.</p>
            </article>
            <article className="step-card">
              <div className="step-top"><span>STEP 03</span><span className="step-symbol">↗</span></div>
              <div className="step-illustration recipe-illustration"><div className="recipe-sheet"><span /><span /><span /></div><div className="recipe-spark">✦</div></div>
              <h3>Get Recipes</h3>
              <p>Receive creative recipe ideas based on the leftovers you want to use.</p>
            </article>
          </div>
        </section>

        <section className="benefits-section section-pad">
          <div className="section-kicker">03 — WHY CHOOSE US?</div>
          <div className="benefits-heading"><h2>Good for your kitchen.<br /><span>Better for the planet.</span></h2><p>Small everyday choices can add up to meaningful change.</p></div>
          <div className="benefits-grid">
            <article className="benefit-item"><span className="benefit-number">01</span><span className="benefit-icon">✳</span><h3>AI Innovation</h3><p>Smart recipe creation that adapts to the ingredients you have.</p></article>
            <article className="benefit-item"><span className="benefit-number">02</span><span className="benefit-icon">↻</span><h3>Reduce Waste</h3><p>Make better use of leftover food instead of throwing it away.</p></article>
            <article className="benefit-item"><span className="benefit-number">03</span><span className="benefit-icon">◷</span><h3>Save Time</h3><p>Find practical meal inspiration without starting from scratch.</p></article>
            <article className="benefit-item"><span className="benefit-number">04</span><span className="benefit-icon">₹</span><h3>Save Money</h3><p>Use what is already in your kitchen and shop more thoughtfully.</p></article>
          </div>
        </section>

        <section className="recipes-section section-pad">
          <div className="section-heading">
            <div><div className="section-kicker">04 — A TASTE OF WHAT'S POSSIBLE</div><h2>Recipe <span>inspiration.</span></h2></div>
            <a className="outline-button" href="/explore">Explore recipes <span>↗</span></a>
          </div>
          <p className="recipes-intro">Discover examples of meals made from leftover ingredients.</p>
          <div className="recipes-grid">
            {recipes.map((recipe) => (
              <article className="recipe-card" key={recipe.number}>
                <div className={`recipe-art recipe-art-${recipe.number}`}>
                  <span className="recipe-count">{recipe.number}</span>
                  <span className="plate"><span className="plate-food" /></span>
                  <span className="recipe-tag">{recipe.tag}</span>
                </div>
                <div className="recipe-details">
                  <h3>{recipe.name}</h3>
                  <p>{recipe.description}</p>
                  <div className="recipe-ingredients">{recipe.ingredients}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mission-section section-pad">
          <div className="mission-decoration">✳</div>
          <div className="section-kicker">05 — OUR MISSION</div>
          <h2>A world with<br /><span>less food waste.</span></h2>
          <p>Our mission is to make food reuse easier through AI-powered creativity and responsible cooking. Because the next great meal might already be in your kitchen.</p>
          <a className="primary-button light-button" href="/generate">Make something delicious <span>→</span></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="brand footer-brand" href="#home"><span className="brand-mark">ZW</span><span className="brand-name">ZERO-WASTE <b>KITCHEN AI</b></span></a>
          <p>Turning leftovers into possibilities.</p>
          <div className="footer-links"><a href="#home">About</a><a href="#how-it-works">How It Works</a><a href="/privacy">Privacy Policy</a><a href="/contact">Contact</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 ZERO-WASTE KITCHEN AI</span><span>DESIGNED FOR A MORE SUSTAINABLE TOMORROW</span></div>
      </footer>
    </div>
  );
}

export default Home;
