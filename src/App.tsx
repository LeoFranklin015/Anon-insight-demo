import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Create from "./pages/Create";
import RatingPage from "./pages/Rating";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Create />
      {/* <RatingPage /> */}
    </>
  );
}

export default App;
