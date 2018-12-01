const fetch = require('node-fetch');
const tokenHelper = require('./token.helper');

function getRecipes(ingridientsArray) {
	const ingredients = ingridientsArray.join('%2C');
	return fetch(
		`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?number=20&limitLicense=true&ranking=0&fillIngredients=true&ingredients=${ingredients}`,
		{
			headers: {
				'X-RapidAPI-Key': tokenHelper.getToken()
			}
		}
	)
		.then(response => response.json())
		.then(recipes =>
			recipes.sort(
				(a, b) =>
					b.usedIngredientCount - b.missedIngredientCount - (a.usedIngredientCount - a.missedIngredientCount)
			)
		);
}
function getRecipe(id) {
	return fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, {
		headers: {
			'X-RapidAPI-Key': tokenHelper.getToken()
		}
	}).then(response => response.json());
}

module.exports = {
	getRecipes: getRecipes,
	getRecipe: getRecipe
};
