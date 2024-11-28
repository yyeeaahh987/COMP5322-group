import { useEffect } from "react"
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import "./App.css"
import { Counter } from "./features/counter/Counter"
import { Quotes } from "./features/quotes/Quotes"
import logo from "./logo.svg"
import { Login } from "./features/login/Login"
import { useAppDispatch, useAppSelector } from "./app/hooks"
import {
  selectLoginSuccess
} from "./features/login/userSlice"
import { Home } from "./features/home/Home"
import { ItemCard } from "./features/card/ItemCard"
import NoMatch from "./pages/NoMatch"
import { ItemDetail } from "./features/itemDetail/ItemDetail"
import { Overview } from "./pages/Overview"
import { Promotion } from "./pages/Promotion"
import { ShoppingCart } from "./pages/ShoppingCart"
import { Register } from "./features/register/Register"
import { UploadItem } from "./features/upload/uploadItem"

const DOMAIN = process.env.REACT_APP_DOMAIN;


const App = () => {

  const dispatch = useAppDispatch()
  const loginSuccess = useAppSelector(selectLoginSuccess)
  
  const router = createBrowserRouter([
    {
      path: "/home",
      element: (
        <Home/>
      ),
      children: [
        // {
        //   index: true,
        //   element: <Home />,
        // },
        {
          path: "promotion",
          // Single route in lazy file
          // lazy: () => import("./features/home/Home"),
          element: <Promotion></Promotion>,
        },
        {
          path: "overview/:category/:subcategory",
          // Single route in lazy file
          // lazy: () => import("./features/home/Home"),
          element: <Overview></Overview>,
        },
        {
          path: "cart",
          element: <ShoppingCart></ShoppingCart>,
        },
        {
          path: "item/detail/:itemId",
          // Single route in lazy file
          // lazy: () => import("./features/home/Home"),
          element: <ItemDetail></ItemDetail>,
        },
        // {
        //   path: "item",
        //   // Component: ItemDetail,
        //   // async lazy() {
        //   //   // Multiple routes in lazy file
        //   //   let { DashboardLayout } = await import("./pages/Dashboard");
        //   //   return { Component: DashboardLayout };
        //   // },
        //   children: [
        //     // {
        //     //   index: true,
        //     //   async lazy() {
        //     //     let { DashboardIndex } = await import("./pages/Dashboard");
        //     //     return { Component: DashboardIndex };
        //     //   },
        //     // },
        //     {
        //       path: ":id",
        //       element: <ItemDetail></ItemDetail>,
        //       // async lazy() {
        //       //   let { DashboardIndex } = await import("./features/card/ItemCard");
        //       //   return { Component: DashboardIndex };
        //       // },
        //     },
        //   ],
        // },
        // {
        //   path: "*",
        //   element: <NoMatch />,
        // },
      ],
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/uploadItem",
      element: <UploadItem/>,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "*",
      element: <NoMatch />,
    }
  ]);

  useEffect(() => {
    console.log(`loginSuccess`,loginSuccess)
    if(loginSuccess === true){
      window.location.href = `${DOMAIN}/home/promotion`
    }
  }, [loginSuccess])

  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App


















// return (
//   <>
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="/home" element={<Home />}>
//         {/* <Route path="/home/item/detail/:id" element={<Drink></Drink>}>
//         </Route> */}
//       </Route>
// {/*         
//       <Route path="/home" element={<Home clickedSection={clickedSection} setClickedSection={setClickedSection} />}>
        
//       </Route>
//       <Route path="chiikawa" element={<Chiikawa />} />
//       <Route path="mahjong" element={<Mahjong />} />
//       <Route path="*" element={<Home />} /> */}
//     </Routes>
//   </>
// )






























// import "./App.css"
// import { Counter } from "./features/counter/Counter"
// import { Quotes } from "./features/quotes/Quotes"
// import logo from "./logo.svg"

// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <Counter />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <Quotes />
//         <span>
//           <span>Learn </span>
//           <a
//             className="App-link"
//             href="https://reactjs.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux.js.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://redux-toolkit.js.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Redux Toolkit
//           </a>
//           <span>, </span>
//           <a
//             className="App-link"
//             href="https://react-redux.js.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             React Redux
//           </a>
//           ,<span> and </span>
//           <a
//             className="App-link"
//             href="https://reselect.js.org"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Reselect
//           </a>
//         </span>
//       </header>
//     </div>
//   )
// }

// export default App
