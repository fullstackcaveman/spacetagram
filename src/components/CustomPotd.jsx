import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Picture from '../components/PictureOfTheDay';
import Background from '../components/elements/Background';
import { Checkbox, Form, Header as MainHeader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import PictureSelector from './elements/PictureSelector';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const CustomPotd = (input) => {
	const history = useHistory();
	const searchDate = history.location.pathname.slice(1, 11);

	const [picOfTheDay, setPicOfTheDay] = useState({});
	const [loading, setLoading] = useState(true);
	const [highDef, setHighDef] = useState();
	const [isChecked, setIsChecked] = useState(false);
	// eslint-disable-next-line
	const [picDate, setPicDate] = useState(new Date(searchDate));

	useEffect(() => {
		const getPicOfTheDay = () => {
			axios
				.get(`${BASE_URL}?api_key=${API_KEY}&date=${searchDate}`)
				.then((res) => {
					setPicOfTheDay(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getPicOfTheDay();
		setLoading(false);
	}, [searchDate]);

	useEffect(() => {
		const stickyDef = localStorage.getItem('high-def');

		if (!stickyDef) {
			setHighDef(false);
			setIsChecked(false);
		} else if (stickyDef === 'true') {
			setHighDef(true);
			setIsChecked(true);
		}
	}, []);

	const picQuality = () => {
		if (highDef) {
			setHighDef(!highDef);
			localStorage.removeItem('high-def');
			setIsChecked(false);
		} else {
			setHighDef(!highDef);
			localStorage.setItem('high-def', 'true');
			setIsChecked(true);
		}
	};

	return (
		<>
			<div className='App'>
				<Background />
				<MainHeader as='header' color='red' inverted>
					<div className='header-content'>
						<Link to='/'>
							<h2 className='home-link'>Spacetagram</h2>
						</Link>
						<div className='search-field'>
							<PictureSelector search={new Date(searchDate)} />
						</div>
						<div className='high-def'>
							<Form inverted>
								<Form.Field
									control={Checkbox}
									checked={isChecked}
									label={{ children: 'Display HD Photos' }}
									onClick={picQuality}
								/>
							</Form>
						</div>
					</div>
				</MainHeader>
				<Picture
					picDate={picDate}
					nextDay={true}
					hdurl={picOfTheDay.hdurl}
					title={picOfTheDay.title}
					image={highDef ? picOfTheDay.hdurl : picOfTheDay.url}
					description={picOfTheDay.explanation}
					copyright={!picOfTheDay.copyright ? 'Unknown' : picOfTheDay.copyright}
					date={picOfTheDay.date}
					loading={loading}
				/>
			</div>
		</>
	);
};

export default CustomPotd;
