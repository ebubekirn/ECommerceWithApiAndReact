import ProductList from "./components/Product/ProductList";
import Registration from "./components/Register/Registration";
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Layout from "./components/Layout";
import ProductCreate from "./components/Product/ProductCreate";
import ProductUpdate from "./components/Product/ProductUpdate";
import CategoriesList from "./components/Categories/CategoriesList";
import CategoriesCreate from "./components/Categories/CategoriesCreate";
import Login from "./components/Login";
import CategoriesUpdate from "./components/Categories/CategoriesUpdate";
import UsersList from "./components/User/UsersList";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
      <Layout/>
      <Routes>
        <Route path="/" element ={<ProductCreate/>}></Route>
        <Route path="/Products/List" element ={<ProductList/>}></Route>
        <Route path="/products/create" element ={<ProductCreate/>}></Route>
        <Route path="/products/update" element ={<ProductUpdate/>}></Route>
        <Route path="/registration" element ={<Registration/>}></Route>
        <Route path="/categories/list" element ={<CategoriesList/>}></Route>
        <Route path="/categories/create" element ={<CategoriesCreate/>}></Route>
        <Route path="/categories/edit" element ={<CategoriesUpdate/>}></Route>
        <Route path="/login" element ={<Login/>}></Route>
        <Route path="/user/usersList" element ={<UsersList/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
