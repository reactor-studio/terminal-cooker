const { h, Component } = require('ink');
const importJsx = require('import-jsx');

const tokenHelper = require('./services/token.helper');
const apiHelper = require('./services/api');

const Loader = importJsx('./components/loader');
const Recipes = importJsx('./components/recipes');
const Recipe = importJsx('./components/recipe');

class App extends Component {
	constructor(props) {
		super(props);
		const ingridients = Object.values(props).filter(i => typeof i === 'string');

		this.state = {
			recipes: [],
			ingridients,
			selectedRecipe: null
		};
		this.selectRecipe = this.selectRecipe.bind(this);
	}
	componentDidMount() {
		const { ingridients } = this.state;
		apiHelper.getRecipes(ingridients).then(recipes => this.setState({ recipes }));
	}

	selectRecipe(recipe) {
		this.setState({ selectedRecipe: recipe });
	}

	render(props, state) {
		const { recipes, selectedRecipe } = state;
		let content = !recipes.length ? <Loader /> : <Recipes recipes={recipes} selectRecipe={this.selectRecipe} />;
		if (selectedRecipe) {
			content = <Recipe recipe={selectedRecipe} />;
		}
		return <div>{content}</div>;
	}
}

module.exports = App;
