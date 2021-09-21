import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './elements/Header';
import PictureOfTheDay from '../components/PictureOfTheDay';

const BASE_URL = process.env.REACT_APP_BASE_URL;
// To protect personal API key
const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
	const [picOfTheDay, setPicOfTheDay] = useState({});
	const [loading, setLoading] = useState(true);
	const [highDef, setHighDef] = useState();
	const [isChecked, setIsChecked] = useState(false);
	const picDate = new Date();

	useEffect(() => {
		const getPicOfTheDay = () => {
			axios
				// Added thumbs=true to get the thumbnail if the daily "pic" is a video
				.get(`${BASE_URL}?api_key=${API_KEY}&thumbs=true`)
				.then((res) => {
					setPicOfTheDay(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getPicOfTheDay();
		const loadingTimeout = setTimeout(() => setLoading(false), 1500);

		return () => {
			clearTimeout(loadingTimeout);
		};
	}, []);

	// stickyDef is used to change the image url to hdurl if the user wants to see the High Definition version of the picture.
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

	// Handles the HD photos checkbox state
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
		<div className='App'>
			<Header isChecked={isChecked} picQuality={picQuality} picDate={picDate} />
			<PictureOfTheDay
				picDate={picDate}
				mediaType={picOfTheDay.media_type}
				thumbs={picOfTheDay.thumbnail_url}
				hdurl={picOfTheDay.hdurl}
				title={picOfTheDay.title}
				image={highDef ? picOfTheDay.hdurl : picOfTheDay.url}
				description={picOfTheDay.explanation}
				copyright={!picOfTheDay.copyright ? 'Unknown' : picOfTheDay.copyright}
				date={picOfTheDay.date}
				loading={loading}
			/>
		</div>
	);
};

export default Home;
