// React-router tools
import { useNavigate, useRouteError } from 'react-router';

// styles
import '../../../../assets/scss/components/pages/RecipesPage/_recipeError.scss';

function RecipeError() {

   // Hooking
   const error = useRouteError();
   const back2Recipes = useNavigate();
   const handleClick = () => back2Recipes('recipes'); 

   return (
      <>
               <section className='main__error error'>
                  <h2 className='error__title'>Oops, something happened with recipes...</h2>

                  <p className='error__describe'>Sorry, an unexpected error has occured</p>
                  <p className='error__status'>Status: {error.statusText || error.message}</p>

                  <button onClick={handleClick} className='error__backPage'>Back to last page</button>
               </section>
      </>
   );
}

export default RecipeError;