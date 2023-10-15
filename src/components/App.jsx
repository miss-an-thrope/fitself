// React tools
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState } from 'react';
// styles
import '../assets/scss/components/_app.scss';

// Components
import Root from "./root/Root";
import AuthContext from '../assets/js/auth-context';
import { auth } from '../assets/js/firebase/firebase';
// Pages
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import CalcPage from './pages/CalculatorPage/CalcPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import SignInPage from './pages/SignInPage/SignInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';


export default function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [uid, setUid] = useState("");
   useEffect(() =>{
      auth.currentUser ? setIsLoggedIn(true) : setIsLoggedIn(false)
      auth.currentUser ? setUid(auth.currentUser.uid) : setUid("")
   
   },[])
   console.log(auth.currentUser)

   const router = createBrowserRouter([
      {
         path: '/',
         element: <Root />,
         errorElement: <ErrorPage />,
         children: [
            {
               path: '/',
               element: <HomePage />
            },
            {
               path: 'calculator',
               element: <CalcPage />
            },
            {
               path: 'signup',
               element: <RegistrationPage />
            },
            {
               path: 'signin',
               element: <SignInPage />
            },
            {
               path: 'profile',
               element: <ProfilePage />
            }
         ],    
      },
   ]);

   return (
      <AuthContext.Provider value = {{
         isLoggedIn: isLoggedIn,
         setIsLoggedIn: setIsLoggedIn,
         uid: uid,
         setUid: setUid
         }}>
         <RouterProvider router={router} />
      </AuthContext.Provider>
   );
}