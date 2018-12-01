const { h, Component } = require('ink');
const importJsx = require('import-jsx');

const tokenHelper = require('./services/token.helper');
const apiHelper = require('./services/api');

const Loader = importJsx('./components/loader');
const Recipes = importJsx('./components/recipes');

class App extends Component {
	constructor(props) {
		super(props);
		const ingridients = Object.values(props).filter(i => typeof i === 'string');

		this.state = {
			recipes: [],
			ingridients
		};
	}
	componentDidMount() {
		const { ingridients } = this.state;
		apiHelper.getRecipes(ingridients).then(recipes => this.setState({ recipes }));
	}
	render() {
		const { recipes } = this.state;
		return <div>{!recipes.length ? <Loader /> : <Recipes recipes={recipes} />}</div>;
	}
}

module.exports = App;
