import { Navigate, Route, Routes } from "react-router-dom"
import { ProductsPage } from "./pages/ProductsPage"
import { ProductRegisterPage } from "./pages/ProductRegisterPage"
import { NavBar } from "./components/layout/NavBar"
import { MediaProvider } from "./context/MediaProvider"
import { UserProvider } from "./context/UserProvider"
import { ProductProvider } from "./context/ProductProvider"
import { ProductCatalogView } from "./components/ProductCatalogView"
import { ProductAttributeTable } from "./components/ProductAttributeTable"
import { CartPage } from "./pages/CartPage"
import { LoginPage } from "./auth/pages/LoginPage"
import { AcountRegisterPage } from "./auth/pages/AcountRegisterPage"
import { CartProvider } from "./context/CartProvider"
import { AuthContext } from "./auth/context/AuthContext"
import { useContext } from "react"
import { UsersPage } from "./pages/UsersPage"
import { ProductViewModel } from "./pages/ProductViewModel"
import { InitPage } from "./pages/InitPage"
import { AdminPage } from "./pages/AdminPage"
import { PagesRegisterPage } from "./pages/PagesRegisterPage"
import { NavBarMenu } from "./components/layout/NavBarMenu"

export const SuelasApp = () => {

    const {login} = useContext(AuthContext);

    return (
        <>
        <MediaProvider>
        <UserProvider>
        <ProductProvider>
            <CartProvider>
        <NavBar/>
            <Routes>

                <Route path="login" element={<LoginPage/>}/>

                <Route path="init" element={<InitPage/>}/>

                <Route path="account/register" element={<AcountRegisterPage/>}/>

                <Route path="products" element={<ProductsPage/>}/>

                <Route path="products/catalog" element={<ProductCatalogView/>}/>

                <Route path="navbar" element={<NavBarMenu/>}/>

                {!login.isAdmin || <>

                <Route path="users" element={<UsersPage />} />
                
                <Route path="pages" element={<AdminPage/>}/>

                <Route path="pages/register" element={<PagesRegisterPage/>}/>

                <Route path="pages/edit/:id" element={<PagesRegisterPage/>}/>
                
                <Route path="products/edit/attributes" element={<ProductAttributeTable/>}/>

                <Route path="products/register" element={<ProductRegisterPage/>}/>

                <Route path="products/edit/:id" element={<ProductRegisterPage/>}/>

                </>}

                <Route path="products/mod/:id" element={<ProductViewModel/>}/>

                <Route path="products/cartPage" element={<CartPage/>}/>

                <Route path="/*" element={<Navigate to="/products"/>}/>

            </Routes>
            </CartProvider>
        </ProductProvider>
        </UserProvider>
        </MediaProvider>
        </>
    )
}