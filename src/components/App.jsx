// React tools
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useEffect, useState} from 'react';

// styles
import '../assets/scss/components/_app.scss';

// Components
import AuthContext from '../assets/js/authentication/auth-context';
// Pages
import CalcPage from './pages/CalculatorPage/CalcPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import SignInPage from './pages/SignInPage/SignInPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

// => Static
import Root from "./root/Root";
import ErrorPage from "./pages/ErrorPage";
// => Recipes
import RecipesPage from './pages/RecipesPage/RecipesPage';
import RecipeDetails from './pages/RecipesPage/RecipeDetails/RecipeDetails';
import RecipeError from './pages/RecipesPage/RecipeDetails/RecipeError';
import UpdateDataPage from './pages/UpdateDataPage/UpdateDataPage';


export default function App() {
   const lc = window.localStorage;
   const authLC = JSON.parse(lc.getItem('auth')) ;
   const [isLoggedIn, setIsLoggedIn] = useState("");
   const [uid, setUid] = useState("");
   // console.log(auth);
   useEffect(() => {
      if(authLC){
         setIsLoggedIn(authLC.isLoggedIn);
         setUid(authLC.uid);
      }
      else{
         setIsLoggedIn(false);
         setUid("");
      }
   }, [])

   const router = createBrowserRouter([
      {
         path: '/',
         element: <Root />,
         errorElement: <ErrorPage />,
         children: [
            {
               path: '/',
               element: <CalcPage />
            },
            {
               path: 'recipes',
               element: <RecipesPage />,
            },
            {
               path: 'recipes/:id',
               element: <RecipeDetails />,
               errorElement: <RecipeError />,
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
            },
            {
               path: 'updateUsersData',
               element: <UpdateDataPage />,
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