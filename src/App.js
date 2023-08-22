import { useState } from "react";

import "./App.css";
//import our Web Component
import "./web-components/custom-list";

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <h2>List the Payment transactions</h2>
      <custom-list></custom-list>
    </div>
  );
}

export default App;
