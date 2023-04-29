import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({recipes}) => {
    return (
        <>
        { recipes.map((recipe) => (

            <div className="card" key={recipe.id}>
              <figure className="card__thumb">
                <div className="toptop">
                  <img
                    className="flag"
                    src={recipe.country.flagUrl}
                    alt={recipe.country.name}
                  />
                </div>
                <img
                  src={`https://source.unsplash.com/300x510/?${recipe.name} `}
                  alt="chef"
                  className="card__image"
                />
                <figcaption className="card__caption">
                  <h2 className="card__title">🥘 {recipe.name}</h2>
                  <small>By</small>
                  <h3 className="card__title">👨‍🍳 {recipe.author}</h3>
                  <p className="card__snippet">
                    Total ingredients : <b>{recipe?.ingredients.length || 0}</b>
                    <br />
                    Steps: <b>{recipe.steps?.length || ''}</b> <br />
                    <span className="emojis">⏱️</span> Time :
                    <b>
                      {recipe.steps.reduce((a, b) => a + parseInt(b.timers), 0)}
                    </b>
                  </p>
                  <p>
                    {" "}
                    <img
                      className="p_Flag"
                      src={recipe.country.flagUrl}
                      alt="india"
                    />
                    <br />
                    {recipe.country.name.toUpperCase()}
                  </p>
                  <Link
                    to={`/viewRecipe/${recipe.id}`}
                    className="card__button"
                  >
                    More Details
                  </Link>
                </figcaption>
              </figure>
            </div>

))
}
        </>
    );
};

export default RecipeCard;