const { h, Color, Component, Fragment } = require('ink');
const importJsx = require('import-jsx');
const BigText = require('ink-big-text');
const Divider = require('ink-divider');
const { List, ListItem } = require('ink-checkbox-list');
const Link = require('ink-link');

const Loader = importJsx('./loader');

const apiHelper = require('../services/api');

class Recipe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipe: null
		};
	}
	componentDidMount() {
		const { id } = this.props.recipe;
		apiHelper.getRecipe(id).then(recipe => this.setState({ recipe }));
	}
	renderIngridients(ingridient) {
		return <div> {ingridient.originalString}</div>;
	}
	renderInstructions(instruction) {
		return (
			<div>
				{instruction.name && <Divider title={instruction.name} />}
				<List>{instruction.steps.map(i => <ListItem value="val">{i.step}</ListItem>)}</List>
			</div>
		);
	}
	render(props) {
		const { recipe } = this.state;
		let content = <Loader />;

		if (recipe) {
			content = (
				<Fragment>
					<Divider title="Link" />
					<div>
						{' '}
						<Link url={recipe.sourceUrl}>
							<Color>Link</Color>
						</Link>
					</div>
					<Divider title="Ready in" />
					<div> {recipe.readyInMinutes} minutes </div>
					<Divider title="Ingridients" />
					<div>{recipe.extendedIngredients.map(this.renderIngridients)}</div>
					<Divider title="Instructions" />
					<div>{recipe.analyzedInstructions.map(this.renderInstructions)}</div>
					{recipe.winePairing.pairingText && (
						<Fragment>
							<Divider title="Wine Pairing" />
							<div>{' ' + recipe.winePairing.pairingText}</div>
						</Fragment>
					)}
				</Fragment>
			);
		}
		return (
			<div>
				<BigText text={props.recipe.title} />
				{content}
			</div>
		);
	}
}

module.exports = Recipe;
