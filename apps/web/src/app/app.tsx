// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.css';
import Department from './Department';
import NxWelcome from './nx-welcome';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Employee from './Employee';
import Navigation from './Department';

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route path="employees" element={<Employee />}></Route>
          <Route path="departments" element={<Employee />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
