import { Routes, Route } from "react-router-dom";
import Header from "../components/header.js"
import Test from "./test.js";
import Site from "./site.js";


function Index() {


  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Site />} />
          <Route path="/howtouse" element={<Test />} />
          <Route path="/fee-methods" element={<Test />} />
          <Route path="/new-message" element={<Test />} />
          <Route path="/activity" element={<Test />} />
        </Routes>
      </div>
    </>
  );
}

export default Index;


