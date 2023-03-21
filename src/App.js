import { Routes, Route, useLocation } from "react-router-dom";
import MainScreen from "./components/Home";

import { Layout } from "./components/Layout";
require("./index.css");
function App() {
  let location = useLocation();

  return (
    <>
      <Routes> 
        <Route path="/"  element={<Layout/>}>
          <Route index element={<MainScreen />} />
        </Route>
        {/* <Route element={<Layout header={true} />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
