import React, { useState } from "react";
import ReactDOM from "react-dom";

import { Loading, Feature, Preview, Search, Title } from "./components/index.jsx";

function App() {
  const [searchResults, setSearchResults] = useState({info: {}, records: []});
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="app">
      {/* <Title /> is static, doesn't need any props */}
      <Title />

      {/* <Search /> needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}
      <Search setIsLoading={setIsLoading} setSearchResults={setSearchResults} />

      {/* <Preview /> needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}
      <Preview searchResults={searchResults} setIsLoading={setIsLoading} setSearchResults={setSearchResults} setFeaturedResult={setFeaturedResult} />

      {/* <Feature /> needs props for featuredResult, as well as setIsLoading and setSearchResults (clicking on searchable properties) */}
      <Feature featuredResult={featuredResult} setIsLoading={setIsLoading} setSearchResults={setSearchResults} />

      {/* <Loading /> is static, but should only render when isLoading is true */}
      {/* use a ternary and render null if isLoading is false */}
      {isLoading ? <Loading /> : null}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
