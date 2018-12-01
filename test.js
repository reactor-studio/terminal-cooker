import { h, renderToString, Color } from 'ink';
import importJsx from 'import-jsx';
import test from 'ava';

const App = importJsx('./src/app');

test('output', t => {
	const actual = renderToString(<App />);
	const expected = renderToString(<Color green>I love Ink</Color>);

	t.is(actual, expected);
});
