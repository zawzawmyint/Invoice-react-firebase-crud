import "./App.css";
import InvoiceList from "./components/InvoiceList";
import AddNewInvoice from "./components/AddNewInvoice";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import UpdateInvoice from "./components/UpdateInvoice";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<InvoiceList />}></Route>
          <Route path="/add-new-invoice" element={<AddNewInvoice />}></Route>
          <Route path="/update-invoice/:id" element={<UpdateInvoice />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
