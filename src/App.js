import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Homepage from "./Pages/Homepage";
import Offer from "./Pages/Offer";
import CreateOffer from "./Pages/CreateOffer";
import "./App.scss";

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Router>
          <Header />
          <Switch>
            <Route path="/create">
              <CreateOffer />
            </Route>
            <Route path="/offer/:id">
              <Offer />
            </Route>
            <Route exact path="/">
              <Homepage />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
