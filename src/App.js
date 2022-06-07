import { LOCALES } from "./i18n/locales";
import React, { useState } from "react";
import { IntlProvider } from "react-intl";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import messages from "./i18n/messages";
import { NavBar } from "./shared/components/NavBar";
import { PokemonList } from "./pages/pokemon-list/PokemonList";
import { PokemonsContext } from "./context/PokemonsContext";
import { LocaleContext } from "./context/LocaleContext";
import "./App.scss";

function App() {
  function select() {
    if (navigator.language.includes("en")) {
      return "en-us";
    } else if (navigator.language.includes("es")) {
      return "es-co";
    }
  }

  const [language, setLanguage] = useState(select);

  const [pokemonsList, setPokemonsList] = useState("");

  return (
    <>
      <IntlProvider locale={language} messages={messages[language]}>
        <LocaleContext.Provider value={[language, setLanguage]}>
          <Router>
            <NavBar></NavBar>
            <Routes>
              <Route
                exact
                path="/"
                element={
                  <PokemonsContext.Provider
                    value={[pokemonsList, setPokemonsList]}
                  >
                    <PokemonList></PokemonList>
                  </PokemonsContext.Provider>
                }
              />
              <Route
                path="*"
                element={
                  <main style={{ padding: "1rem" }}>
                    <p>There's nothing here!</p>
                  </main>
                }
              />
            </Routes>
          </Router>
        </LocaleContext.Provider>
      </IntlProvider>
    </>
  );
}

export default App;
