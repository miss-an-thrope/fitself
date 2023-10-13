// React tools
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// styles
import '../assets/scss/components/_app.scss';

// Components
import Root from "./root/Root";

// Pages
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import CalcPage from './pages/CalculatorPage/CalcPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';

export default function App() {

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
            }
         ],    
      },
   ]);

   return (
      <>
         <RouterProvider router={router} />
      </>
   );
}