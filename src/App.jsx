import { useState, useEffect } from 'react';
import axios from 'axios';
import Picture from './components/PictureOfTheDay';
import Background from './components/elements/Background';
import { Checkbox, Form, Header as MainHeader } from 'semantic-ui-react';

const BASE_URL = process.env.REACT_APP_BASE_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
	const [picOfTheDay, setPicOfTheDay] = useState({});
	const [loading, setLoading] = useState(true);
	const [highDef, setHighDef] = useState(false);

	useEffect(() => {
		const getPicOfTheDay = () => {
			axios
				.get(`${BASE_URL}?api_key=${API_KEY}`)
				.then((res) => {
					setPicOfTheDay(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		};
		getPicOfTheDay();
	}, []);

	const picQuality = () => {
		setHighDef(!highDef);
	};

	return (
		<>
			<div className='App'>
				<Background />
				<MainHeader as='header' color='red' inverted>
					<div className='header-content'>
						<h2>Spacetagram</h2>
						<div className='high-def'>
							<Form inverted>
								<Form.Field
									control={Checkbox}
									label={{ children: 'Display HD Photos' }}
									onClick={picQuality}
								/>
							</Form>
						</div>
					</div>
				</MainHeader>
				<Picture
					title={picOfTheDay.title}
					image={highDef ? picOfTheDay.hdurl : picOfTheDay.url}
					description={picOfTheDay.explanation}
					copyright={picOfTheDay.copyright}
					date={picOfTheDay.date}
					loading={loading}
				/>
			</div>
		</>
	);
}

export default App;
