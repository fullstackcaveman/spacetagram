import { Route, Switch } from 'react-router-dom';
import CustomPotd from './components/CustomPotd';
import Background from './components/elements/Background';
import Home from './components/Home';

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route path='/:date' component={CustomPotd} />
				<Route path='/' component={Home} />
			</Switch>
			<Background />
		</div>
	);
}

export default App;
