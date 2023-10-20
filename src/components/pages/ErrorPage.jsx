// React-router tools
import { useNavigate, useRouteError } from 'react-router';

// styles
import '../../assets/scss/components/pages/_error.scss';

// components
import Header from '../root/blocks/Header';
import Footer from '../root/blocks/Footer';

export default function ErrorPage() {

   // Hooking
   const error = useRouteError();
   const backPreviousPage = useNavigate();

   const handleClick = () => backPreviousPage(-1); // (-1) => link for last checked page. 

   return (
      <>
         <div className='container'>

            <Header />

            <main className='main'>
               <section className='main__error error'>
                  <h2 className='error__title'>Oops, something happened...</h2>

                  <p className='error__describe'>Sorry, an unexpected error has occured</p>
                  <p className='error__status'>Status: {error.statusText || error.message}</p>

                  <button onClick={handleClick} className='error__backPage'>Back to last page</button>
               </section>
            </main>

            <Footer />

         </div>
      </>
   );
}