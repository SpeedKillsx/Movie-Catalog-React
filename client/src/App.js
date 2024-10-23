import logo from './logo.svg';
import './style.css';
import {Books} from './pages/Books.jsx'
import { Add } from './pages/Add.jsx';
import { Update } from './pages/Update.jsx';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/books" element={<Books/>} />
          <Route path="/add" element={<Add/>} />
          <Route path="/update/:id" element={<Update/>} />
        </Routes> 
       
      </BrowserRouter>
    </div>
  );
}

export default App;
