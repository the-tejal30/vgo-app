import "./App.scss";
import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routing";
import { userContext } from "./context";
import { ContextProvider } from "./context/context";

function App() {
  const user = userContext()
  return (
    <ContextProvider value={user}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="main-loader">
              <span>...loading</span>
            </div>
          }
        >
          <Routing />
        </Suspense>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
