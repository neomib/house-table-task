import {
    createBrowserRouter
} from "react-router-dom";
import HouseDetails from "./components/HouseDetails";
import Main from "./components/Main";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "house/:id",
    element: <HouseDetails />
  }

]);