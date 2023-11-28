import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProjectInfo from "./pages/ProjectInfo";
import Register from "./pages/Register";

// The code imports the necessary dependencies: useSelector from "react-redux" and
// BrowserRouter, Routes, and Route from "react-router-dom". It also imports the components used in the application.

// The App function is defined, which is the main component of the application.
// Inside the function, the useSelector hook is used to access the loading state from the Redux store.

// The JSX code defines the structure of the application.
// It starts with a <div> element that wraps the entire application. Inside the <div>,
// there is a conditional rendering of the <Spinner> component based on the loading state.

// The <BrowserRouter> component is used to wrap the <Routes> component,
// which defines the routes for the application.
// Each <Route> component represents a specific route and is associated with a corresponding component.

function App() {
  const { loading } = useSelector((state) => state.loaders);
  return (
    <div>
      {loading && <Spinner />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPage>
                <Home />
              </ProtectedPage>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedPage>
                <ProjectInfo />
              </ProtectedPage>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedPage>
                <Profile />
              </ProtectedPage>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
