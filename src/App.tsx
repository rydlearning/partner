import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UseContext";

const router = createBrowserRouter(routes);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </UserProvider>
  );
}

export default App;
