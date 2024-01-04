import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";


// Auth Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
} from "react-icons/md";
import Orders from "views/admin/orders";
import Users from "views/admin/users";
import Products from "views/admin/products";
import SingleOrder from "views/admin/orders/singleOrder";
import SingleProduct from "views/admin/products/singleProduct";
import AddProduct from "views/admin/products/AddProduct";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Orders",
    layout: "/admin",
    path: "orders",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <Orders />,
    secondary: true,
  },
  {
    name: "Users",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: <Users />,
  },
  {
    name: "Products",
    layout: "/admin",
    path: "products",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Products />,
  },
  {
    name: "Add Product",
    layout: "/admin",
    path: "products/add",
    icon: <MdPerson className="h-6 w-6" />,
    component: <AddProduct />,
  },
  {

    layout: "/admin",
    path: "products/:id",
    component: <SingleProduct />,
  },
  {
    layout: "/admin",
    path: "orders/:id",
    component: <SingleOrder />,

  }
];
export default routes;
