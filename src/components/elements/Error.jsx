import { useEffect } from 'react';
import { useHistory } from 'react-router';
import {
	Button,
	Header as MartianHeader,
	Image,
	Popup,
} from 'semantic-ui-react';
import MartianDestroy from '../../images/martian-destroy.png';

const Error = ({ setError }) => {
	const history = useHistory();
	const peekingMartian = document.getElementById('martian');

	const tickleMartian = () => {
		document.getElementById('martianDestroy').click();
		peekingMartian.classList.add('hidden');
	};

	useEffect(() => {
		tickleMartian();
		// eslint-disable-next-line
	}, []);

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

		// const peekingMartian = document.getElementById('martian');
		peekingMartian.classList.remove('hidden');
		setError(false);
		return history.push(`/${randomYear}-${randomMonth}-${randomDay}`);
	};

	return (
		<div className='martian-destroy'>
			<Popup
				inverted
				on='click'
				trigger={
					<Image id='martianDestroy' size='small' src={MartianDestroy} />
				}
				size='small'
				position='top center'
			>
				<MartianHeader as='h4'>
					"Hahaha...I destroyed the photo you're looking for!"
				</MartianHeader>
				<Button color='orange' onClick={getRandomDate} fluid>
					Try Another Date
				</Button>
			</Popup>
		</div>
	);
};

export default Error;
