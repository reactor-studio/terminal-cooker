const { h, Component } = require('ink');
const importJsx = require('import-jsx');

const tokenHelper = require('./services/token.helper');
const Loader = importJsx('./components/loader');

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recipes: []
		};
	}
	componentDidMount() {}
	render(props) {
		return (
			<div>
				<Loader />
			</div>
		);
	}
}

module.exports = App;
