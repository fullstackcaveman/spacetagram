import { useState, useEffect } from 'react';
import axios from 'axios';
import Picture from './components/PictureOfTheDay';
import Background from './components/elements/Background';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
	const [picOfTheDay, setPicOfTheDay] = useState({});

	useEffect(() => {
		const getPicOfTheDay = () => {
			axios
				.get(`${BASE_URL}?api_key=${API_KEY}`)
				.then((res) => {
					setPicOfTheDay(res.data);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getPicOfTheDay();
	}, []);

	return (
		<>
			<div className='App'>
				<Background />
				<Picture
					title={picOfTheDay.title}
					image={picOfTheDay.url}
					description={picOfTheDay.explanation}
					copyright={picOfTheDay.copyright}
					date={picOfTheDay.date}
				/>
			</div>
		</>
	);
}

export default App;
