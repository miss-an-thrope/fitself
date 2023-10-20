// React tools
import { useEffect, useState } from 'react';
import { AiFillPushpin } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";

// React-router tools
import { useNavigate, useParams } from 'react-router-dom';

//styles
import '../../../../assets/scss/components/pages/RecipesPage/RecipeDetails/_recipeDetails.scss';

// Api
import { fetchRecipe, fetchRecipes } from '../../../../utils/api';

// components
import RecipeCard from '../RecipeCard';
import Loading from '../../../root/blocks/tools/Loading';


const RecipeDetails = () => {

  // Hooks configuration
  const [recipe, setRecipe] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  // routes
  const { id } = useParams()
  
  const backPreviousPage = useNavigate();
  const handleClick = () => backPreviousPage('/recipes');

  const backtoCalc = useNavigate();
  const handleHome = () => backtoCalc('/')
  

  const getRecipe = async (id) => {
    try {
      setLoading(true);

      const data = await fetchRecipe(id);
      setRecipe(data);

      const recommend = await fetchRecipes({ query: recipe?.label, limit: 3 });
      setRecipes(recommend);

      setLoading(false);

    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }


  useEffect(() => {
    getRecipe(id);
  }, [id]);


  if (loading) {
    return (
      <section className='main__recipe recipe'>
        <Loading />
      </section>
    );
  }
  return (
    <>
      <section className='main__recipe recipe'>
        <section className='recipe__info info'>
          <img
            className='info__image'
            src={recipe?.image}
            alt={recipe?.label}
          />
          <article className='info__short short'>
            <h2 className='short__header'>{recipe?.label}</h2>
            <p className='info__calories'>{recipe?.yield ? `Calories for one serving: ${Math.floor(recipe?.calories / recipe.yield).toFixed(2)}` : `Calories: ${recipe?.calories}`}.</p>
            <p className='info__timing'>Cooking Time: {recipe?.totalTime === 0 ? 'different.' : recipe?.totalTime}</p>
            <p className='info__servings'>Total servings due to recipe: {recipe?.yield ? recipe?.yield : 'No servings'}</p>
          </article>

        </section>


        <section className='recipe__desciption description'>
          <article className='recipe__ingridients ingridients'>
            <h3 className='ingridients__header'>Ingredients:</h3>
            {
              recipe?.ingredientLines?.map((ingredient, index) => {
                return (
                  <p key={index} className='ingridients__item'>
                    <AiFillPushpin className='ingridients__icon' /> {ingredient}
                  </p>
                )
              })
            }
          </article>

          <article className='recipe__health health'>
            <h3 className='health__header'>Health Labels</h3>
            {
              recipe?.healthLabels.map((item, index) => (
                <p className='health__text ' key={index}>
                  <BsPatchCheck color='rgba(13, 82, 13, 1)' /> {item}
                </p>
              ))
            }
          </article>
        </section>

        <section className='recipe__recommend recommend'>

          <h2 className='recommend__header'>We also recommend:</h2>

          <section className='recommend__cards'>
            {
              recipes?.map((item, index) => (
                <RecipeCard key={index} recipe={item} index={index} />
              ))
            }
          </section>

        </section>

        <section className='recipe__end end'>
          <button
            className='end__back'
            type='button'
            onClick={handleClick}
          >Back to recipes</button>
          <button 
          className='end__home'
          type='button'
          onClick={handleHome}
          >Check calculator</button>
        </section>
      </section>

    </>
  );
}

export default RecipeDetails;