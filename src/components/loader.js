const { h, Component, Color } = require('ink');
const Spinner = require('ink-spinner');

class Loader extends Component {
	render(props) {
		return (
			<div>
				<Spinner green type="hamburger" /> <Color>Searching for recipes</Color>
			</div>
		);
	}
}

module.exports = Loader;
