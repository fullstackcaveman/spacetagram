import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect } from 'react';

const PictureSelector = ({ search }) => {
	const history = useHistory();
	const [startDate, setStartDate] = useState(search);

	// Sets current random search date in search box
	useEffect(() => {
		if (
			history.location.pathname === '/' ||
			history.location.pathname === '/liked-pics'
		) {
			return;
		} else {
			const newUrl = history.location.pathname;
			const cleanedUrl = newUrl.split('/')[1] + 'T16:00:00';
			const formattedUrl = new Date(cleanedUrl);

			randomPicUpdater(formattedUrl);
		}

		// eslint-disable-next-line
	}, [history.location.pathname]);

	// Function that formats the selected date to a proper API request
	const formatDate = (input) => {
		const formattedDate = new Date(input);
		const month = formattedDate.getMonth() + 1;
		const day = formattedDate.getDate();
		const year = formattedDate.getFullYear();

		return (
			year +
			'-' +
			month.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false,
			}) +
			'-' +
			day.toLocaleString('en-US', {
				minimumIntegerDigits: 2,
				useGrouping: false,
			})
		);
	};

	const randomPicUpdater = (date) => {
		setStartDate(date);
	};

	const dateChangeHandler = (date) => {
		if (formatDate(date) === formatDate(new Date())) {
			history.push('/');
		} else {
			history.push(formatDate(date));
			setStartDate(date);
		}
	};

	return (
		<div className='search-form'>
			<Form size='tiny' inverted>
				<Form.Field
					inline
					control={Input}
					name='searchDate'
					value={startDate}
					label='Search Date'
				>
					<DatePicker
						placeholder='Search Date'
						className='date-picker'
						selected={startDate}
						onChange={(date) => dateChangeHandler(date)}
					/>
				</Form.Field>
			</Form>
		</div>
	);
};

export default PictureSelector;
