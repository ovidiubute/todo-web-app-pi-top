import * as React from "react";
import "./App.less";
import { Header } from "./Header";

export const App = () => {
  return (
    <div>
      <Header />
      <div className="view">Some todos should be here</div>
    </div>
  );
};
