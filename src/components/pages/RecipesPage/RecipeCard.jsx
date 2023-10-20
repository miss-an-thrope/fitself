/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
// React tools
import { useState } from 'react';

// React-router tools
import { Link } from 'react-router-dom';

// styles
import '../../../assets/scss/components/pages/RecipesPage/_recipesCard.scss';


const RecipeCard = ({ recipe }) => {
    const [hovered, setHovered] = useState(false);
    const { image, label, cuisineType, mealType, dishType, uri } = recipe?.recipe;
    const id = uri?.split('#')[1];

    return (
        <section
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`cards__card card${hovered ? ' card--hovered' : ''}`}
            style={{
                backgroundImage: `url(${image})`,
                transition: 'background-image 1.2s ease',
            }}
        >
            <Link to={`/recipes/${id}`} className="card__link">
                <div className="card__content">
                    <div className={`card__header${hovered ? ' card__header--hovered' : ''}`}>
                        <h4>{label}</h4>
                    </div>
                    {hovered && (
                        <article className="card__description">
                            <p>Dish type: {dishType}</p>
                            <p>
                                <span>{cuisineType}</span> <span>{mealType}</span>
                            </p>
                            <p className='card__ads'>Follow for more</p>
                        </article>
                    )}
                </div>
            </Link>
        </section>
    );
};
export default RecipeCard