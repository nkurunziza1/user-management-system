import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LoginForm from "./components/forms/LoginForm.jsx";
import TaskForm from "./components/forms/TaskForm.jsx";
import SignupForm from "./components/forms/SignupForm.jsx";
import ViewProduct from "./components/forms/ViewProduct.jsx";
import NotFound from "./components/forms/NotFound.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<SignupForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/task" element={<TaskForm />} />
      <Route path="/view_task" element={<ViewProduct />} />
      <Route path="/*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
