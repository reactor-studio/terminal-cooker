const { h, Component, Color } = require('ink');
const SelectInput = require('ink-select-input');

const Item = props => {
	const ingridients = props.usedIngredients.map(i => i.name).join(', ');
	let missingIngridients = props.missedIngredients.map(i => i.name);
	if (missingIngridients.length > 5) {
		missingIngridients = missingIngridients.slice(0, 4).join(', ') + '...';
	}
	return (
		<Color blue={props.isSelected}>
			{props.title} - [
			<Color green>{ingridients}</Color>, <Color red>{missingIngridients}</Color>
			]
		</Color>
	);
};

class Recipes extends Component {
	render(props) {
		return <SelectInput items={props.recipes} itemComponent={Item} />;
	}
}

module.exports = Recipes;
