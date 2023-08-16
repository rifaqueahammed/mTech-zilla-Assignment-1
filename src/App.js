import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import SignUp from './components/signUp';
import Timer from './components/timer';
import Authorization from './components/authorization';

function App() {
  
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Authorization><Login/></Authorization>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/timer' element={<Authorization><Timer/></Authorization>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
