// styles
import '../../../assets/scss/components/pages/RecipesPage/_noRecipeFound.scss';

function NoRecipeFound() {
   
   return (
      <>
         <section className="recipes__unfound unfound">
            <h3 className="unfound__title">We have no results for you..</h3>
            <p className="unfound__text">We recommend to find another key-words for your search</p>
         </section>
      </>
   );
}

export default NoRecipeFound;