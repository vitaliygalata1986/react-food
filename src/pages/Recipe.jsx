import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Preloader from '../component/Preloader';
import Button from '../component/Button';
import { getMealById } from '../api';

function Recipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    getMealById(id).then((data) => {
      setRecipe(data.meals[0]);
    });
  }, [id]);
  return (
    <>
      {!recipe.idMeal ? (
        <Preloader />
      ) : (
        <div className="recipe">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} />
          <h1>{recipe.strMeal}</h1>
          <h6>
            <strong>Category:</strong> {recipe.strCategory}
          </h6>
          {recipe.strArea ? (
            <h6>
              <strong>Area:</strong> {recipe.strArea}
            </h6>
          ) : null}
          <p>{recipe.strInstructions}</p>
          <table className="centered">
            <thead>
              <tr>
                <th>Ingredient</th>
                <th>Measure</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(recipe).map((key) => {
                if (key.includes('Ingredient') && recipe[key]) {
                  // и объект recipe с этим ключем Ingredient не пустой
                  // 13 - от какой позиции мы будем забирать числа
                  return (
                    <tr key={key}>
                      <td>{recipe[key]}</td>
                      <td>{recipe[`strMeasure${key.slice(13)}`]}</td>
                    </tr>
                  );
                }
                // если это не ингридиент, то мы возращаем что либо
                return null;
              })}
            </tbody>
          </table>

          {recipe.strYoutube ? (
            <div className="row">
              <h5>Video Recipe</h5>
              <iframe
                title={id}
                src={`https://www.youtube.com/embed/${recipe.strYoutube.slice(
                  -11
                )}`}
                allowFullScreen
              />
            </div>
          ) : null}
        </div>
      )}
      <Button />
    </>
  );
}

export default Recipe;
