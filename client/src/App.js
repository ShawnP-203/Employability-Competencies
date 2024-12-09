import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import {Button} from "@mui/material";
import SelectSkill from "./Components/SelectSkill";

function About() {
  return (<>
    <h2>Learn Employability Competencies</h2>
    <SelectSkill/>
  </>);
}

function Home() {
  return (
    <h2>Employability Competencies</h2>
  );
}

function App() {
  return (<>
    <img src={logo} className="App-logo" alt="logo" />
    <BrowserRouter>
      <Link to="/"><Button variant="contained">Home</Button></Link>
      <Link to="/about"><Button variant="contained">About</Button></Link>
      <br />
      <h1>Essential Employability Competencies</h1>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/about" Component={About} />
      </Routes>
    </BrowserRouter>
  </>);
}

export default App;
