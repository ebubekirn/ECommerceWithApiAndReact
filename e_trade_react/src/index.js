import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CategoryProvider from './context/CatContext';
import ProductProvider from './context/ProContext';
import UserProvider from './context/UserContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ProductProvider>
    <UserProvider>
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </UserProvider>

  </ProductProvider>
);

