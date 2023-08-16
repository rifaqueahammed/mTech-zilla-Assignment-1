import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/login';
import SignUp from './components/signUp';
import Timer from './components/timer';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/timer' element={<Timer/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
