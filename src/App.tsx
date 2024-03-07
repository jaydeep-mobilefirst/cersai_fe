import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Landing from "./pages/Landing";
// import QueryResolutionSession from "./pages/QueryResolutionSession";

function App() {
  const { value } = useSelector((state: RootState) => state.common);

  console.log({ value });
  return (
    <div>
      <Landing />
    </div>
  );
}

export default App;
