import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import EditFighter from './controllers/fighters/EditFighter';
import AddFighter from './controllers/fighters/AddFighter';
import ListFights from './controllers/fights/listFights';
import EditFight from './controllers/fights/EditFight';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/fighters" element={<Home />} />
          <Route exact path="/addfighter" element={<AddFighter />} />
          <Route exact path="/editfighter/:id" element={<EditFighter />} />
          <Route exact path="/fights" element={<ListFights />} />
          <Route exact path="/editfight/:id" element={<EditFight />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
