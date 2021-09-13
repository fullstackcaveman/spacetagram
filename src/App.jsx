import { Route, Switch } from 'react-router-dom';
import Background from './components/elements/Background';
import Home from './components/Home';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route to='/' component={Home} />
			</Switch>
			<Background />
		</div>
	);
}

export default App;
