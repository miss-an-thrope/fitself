/* eslint-disable react-hooks/exhaustive-deps */
// React tools
import { useEffect, useState } from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

//api
import { fetchRecipes } from '../../../utils/api';

// styles
import '../../../assets/scss/components/pages/RecipesPage/_recipes.scss';

/* Components */
// => Page Blocks
import RecipesSearch from './RecipesSearch';
import RecipeCard from './RecipeCard';
import NoRecipeFound from './NoRecipeFound';
// => Tools
import Loading from '../../root/blocks/tools/Loading';
import Button from '../../root/blocks/tools/Button';

function RecipesPage() {
  // Setting Recipes
  const [recipes, setRecipes] = useState([]);

  // API getters:
  const [query, setQuery] = useState('soup');
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(12);
  // Control API Loading
  const [initialLoad, setInitialLoad] = useState(true);
  // Custom Loading
  const [loading, setLoading] = useState(false);
  const [noRecipes, setNoRecipes] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
    setFrom(0);
    setTo(12);
  }

  const handleSearchedRecipe = (e) => {   
    e.preventDefault();
    setNoRecipes(false);
    setInitialLoad(true);
    setRecipes([]);
    fetchRecipe();
  }

  const fetchRecipe = async () => {
    try {
      setLoading(true);
      const data = await fetchRecipes({ query, from, to });
      if (initialLoad) {
        setRecipes(data);
      } else {
        setRecipes(prevRecipes => [...prevRecipes, ...data]);
      }
      setFrom(prevFrom => prevFrom + 12);
      setTo(prevTo => prevTo + 12);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }

  const showMore = () => to > 100 ? setNoRecipes(true) : fetchRecipe();
  
  useEffect(() => {
    fetchRecipe();
    console.log("useEffect on")
  }, []);

  return (
    <>
      <section className='main__recipes recipes'>

        <h2 className='recipes__header'>Check the best recipes for your fit</h2>

        <form onSubmit={handleSearchedRecipe} className='recipes__search recipesSearch'>
          <RecipesSearch
            placeholder="eg. Cake, Vegan, Chicken"
            handleInputChange={handleChange}
            rightIcon={(
              <>
                <div
                  className='recipesSearch__icon'
                  onClick={handleSearchedRecipe}
                >
                  <BiSearchAlt2 />
                </div>
              </>
            )
            }
          />
        </form>

        {initialLoad && loading ? <Loading /> : recipes?.length > 0 ? (
          <>
            <section className='recipes__cards cards'>
              {recipes?.map((item, index) => (
                <RecipeCard recipe={item} key={index} />
              ))}
            </section>

            {loading ? <Loading /> : null}
            {noRecipes ? (
              <>
                <p className='noMoreRecipes'>There are no recipes available</p>
              </>
            ) : null}
            <Button
              title="Show More"
              handleClick={showMore}
            />
          </>
        ) : (
          <NoRecipeFound />
        )
        }

      </section>
    </>
  )
}

export default RecipesPage;