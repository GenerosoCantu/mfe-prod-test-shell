import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Page1 from "page1/Page1";

const App = () => (
  <div>
    <Page1 />
  </div>
);

ReactDOM.render(<App />, document.getElementById("app"));
