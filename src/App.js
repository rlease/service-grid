import React, { Component } from "react";
import HexagonGrid from "./components/HexagonGrid";

class App extends Component {
  render() {
    return <HexagonGrid size={5} rows={3} columns={6} spacing={1} />;
  }
}

export default App;
