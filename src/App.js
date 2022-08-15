import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import { ServiceProvider } from "./hooks/service";


const App = () => {
  return (
    <Router>
      <ServiceProvider>
        <Routes/>
      </ServiceProvider>
    </Router>
  );
}

export default App;
