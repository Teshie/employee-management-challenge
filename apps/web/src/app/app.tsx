// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './Employee';
import Navigation from './NavBar';
import Departments from './Departments';
export function App() {
  return (
    <>
      <div>
        <Navigation />
        <Routes>
          <Route path="/" element={<Departments />} />
          <Route path="employees" element={<Employee />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
