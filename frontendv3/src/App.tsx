import { useEffect } from "react"
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom"
import "./App.css"
import { Login } from "./features/login/Login"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  getUserDetailByUserName,
  selectLoginSuccess,
  selectUserName
} from "./features/login/userSlice"
import { Home } from "./features/home/Home"
import NoMatch from "./pages/NoMatch"
import { ItemDetail } from "./features/itemDetail/ItemDetail"
import { Overview } from "./pages/Overview"
import { Promotion } from "./pages/Promotion"
import { ShoppingCart } from "./pages/ShoppingCart"
import { Register } from "./features/register/Register"
import { UploadItem } from "./features/upload/UploadItem"
import { Order } from "./pages/Order"
import { Loader } from "./features/loader/Loading"
import { selectLoadingStatus } from "./features/loader/loadingSlice"
import { AlertPopup } from "./features/alertPopup/AlertPopup"
import { selectPopupStatus } from "./features/alertPopup/alertPopupSlice"

const App = () => {
  const dispatch = useAppDispatch()
  const loginSuccess = useAppSelector(selectLoginSuccess)
  const userName = useAppSelector(selectUserName)
  const loadingStatus = useAppSelector(selectLoadingStatus)
  const popupStatus = useAppSelector(selectPopupStatus)

  useEffect(() => {
    if (userName !== "") {
      //already have data in store
    } else {
      if (localStorage.getItem("userName") !== null && localStorage.getItem("userName") !== "") {
        //in local storage
        dispatch(getUserDetailByUserName(localStorage.getItem("userName")))
      } else {
        //nothing
      }
    }
  }, [])


  function useAuth() {
    return loginSuccess
  }

  function PrivateRoute({ children }: any) {
    const isAuthenticated = useAuth();
    return isAuthenticated ? children : <Navigate to="/" />;
  }

  return (
    <>
      {loadingStatus === true && <Loader></Loader>}
      {popupStatus === true && <AlertPopup></AlertPopup>}

      <BrowserRouter>
        <Routes>
          <Route path={'/home'} element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }>
            <Route element={<Promotion />} path='/home/promotion'></Route>
            <Route element={<Overview />} path='/home/overview/:category/:subcategory'></Route>
            <Route element={<ShoppingCart />} path='/home/cart'></Route>
            <Route element={<Order />} path='/home/order'></Route>
            <Route element={<ItemDetail />} path='/home/item/detail/:itemId'></Route>
          </Route>
          <Route element={<Register />} path='/register'></Route>
          <Route element={<UploadItem />} path='/uploadItem'></Route>
          <Route element={<Login />} path='/'></Route>
          <Route element={<NoMatch />} path='*'></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
