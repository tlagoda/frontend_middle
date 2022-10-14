import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BeerList from "./pages/BeerList";
import Cart from "./pages/Cart";
import Details from "./pages/Details";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Our Beers
              </Link>
            </li>
            <li>
              <Link to="/cart" className="nav-link">
                Your Cart
              </Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/details" element={<Details />} />
          <Route path="/" element={<BeerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
