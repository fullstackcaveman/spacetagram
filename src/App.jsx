import { useHistory } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Image, Popup, Header, Button } from 'semantic-ui-react';
import CustomPotd from './components/CustomPotd';
import Background from './components/elements/Background';
import Home from './components/Home';
import LikedPics from './components/LikedPics';
import martian from './images/martian.png';

function App() {
	const history = useHistory();

	// Sets random search when user clicks the martian!
	const getRandomDate = () => {
		const thisYear = new Date().getFullYear();
		const randomYear = Math.floor(Math.random() * (thisYear - 1996) + 1996);
		const randomMonth = Math.floor(Math.random() * (12 - 1) + 1).toLocaleString(
			'en-US',
			{
				minimumIntegerDigits: 2,
				useGrouping: false,
			}
		);
		const randomDay = Math.floor(Math.random() * (28 - 1) + 1).toLocaleString(
			'en-US',
			{
				minimumIntegerDigits: 2,
				useGrouping: false,
			}
		);

		return history.push(`/${randomYear}-${randomMonth}-${randomDay}`);
	};

	return (
		<div className='App'>
			<Switch>
				<Route path='/liked-pics' component={LikedPics} />
				<Route path='/:date' component={CustomPotd} />
				<Route path='/' component={Home} />
			</Switch>
			<Popup
				id='martian-popup'
				trigger={<Image src={martian} id='martian' role='button' />}
				position='left center'
				offset={[-10, -25]}
				hoverable
				pinned
				inverted
			>
				<Header as='h4'>Feeling lucky, earthling?</Header>
				<Button color='orange' onClick={getRandomDate}>
					See Random Picture
				</Button>
			</Popup>

			<Background />
		</div>
	);
}

export default App;
