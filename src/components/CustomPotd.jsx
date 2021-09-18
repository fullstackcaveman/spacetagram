import { useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Picture from '../components/PictureOfTheDay';
import Header from './elements/Header';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const CustomPotd = ({ match }) => {
	const searchDate = match.params.date;
	const [picOfTheDay, setPicOfTheDay] = useState({});
	const [loading, setLoading] = useState(true);
	const [highDef, setHighDef] = useState();
	const [isChecked, setIsChecked] = useState(false);
	const picDate = new Date(`${searchDate}T00:00:00`);

	useEffect(() => {
		const getPicOfTheDay = () => {
			axios
				.get(`${BASE_URL}?api_key=${API_KEY}&date=${searchDate}&thumbs=true`)
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
				<Header
					isChecked={isChecked}
					picQuality={picQuality}
					picDate={picDate}
				/>
				<Picture
					picDate={picDate}
					mediaType={picOfTheDay.media_type}
					thumbs={picOfTheDay.thumbnail_url}
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
