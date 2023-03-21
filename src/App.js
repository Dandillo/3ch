import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";

import { Layout } from "./components/Layout";
require("./index.css");
function App() {
  let location = useLocation();

  return (
    <>
      <Routes> 
        <Route path="/"  element={<Layout/>}>
          <Route index element={<Home />} />
        </Route>
        {/* <Route element={<Layout header={true} />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
