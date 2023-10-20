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

  // Hooks configuration
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState('Cake');
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setQuery(e.target.value);
  }

  const fetchRecipe = async () => {
    try {
      const data = await fetchRecipes({ query, limit });
      setRecipes(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleSearchedRecipe = (e) => {
    setLoading(true);
    e.preventDefault()
    
  

    fetchRecipe();

    setLoading(false);
  }

  const showMore = () => {
    setLimit(prev => prev + 12)
    fetchRecipe();
    setLoading(false);
  }


  useEffect(() => {
    setLoading(true);
    fetchRecipe();
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

        {loading ? (
          <Loading />
        ) : recipes?.length > 0 ? (
          <>
            <section className='recipes__cards cards'>
              {recipes?.map((item, index) => (
                <RecipeCard recipe={item} key={index} />
              ))}
            </section>

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
  );
}

export default RecipesPage;