import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import {Button} from '@mui/material';
import SelectSkill from './Components/SelectSkill';

function About() {
  return (
    <h2>Learn Employability Competencies</h2>
  );
}

function Home() {
  return (
    <div>
      <h2>Employability Competencies</h2>
      <SelectSkill/>
    </div>
  );
}

function App() {
  return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <Link to="/"><Button variant='contained'>Home</Button></Link>
          <Link to="/about"><Button variant='outlined'>About</Button></Link>
          <br/>
          <h1>Essential Employability Competencies</h1>
          <Routes>
            <Route path="/" Component={Home}/>
            <Route path="/about" Component={About}/>
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
