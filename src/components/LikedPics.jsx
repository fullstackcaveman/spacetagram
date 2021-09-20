import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from './elements/Header';
import Footer from './elements/Footer';
import { Container, Header as Banner } from 'semantic-ui-react';
import LikedPicCard from './elements/LikedPicCard';

const LikedPics = () => {
	const history = useHistory();
	const [likedPics, setLikedPics] = useState([]);

	// Variables to set random search when user deletes their last liked photo
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

	// localStorage helper function
	Storage.prototype.deleteArrayItem = function (arrayName, itemTitle) {
		let existingArray = this.getArray(arrayName);
		const index = existingArray.findIndex((item) => item.title === itemTitle);
		existingArray.splice(index, 1);
		this.setItem(arrayName, JSON.stringify(existingArray));
	};

	// If user deletes all of their liked pics, they are redirected to a random picture
	const handleEmptyLikes = () => {
		if (likedPics.length - 1 < 1) {
			history.push(`/${randomYear}-${randomMonth}-${randomDay}`);
		}
	};

	// Uses helper funtion to delete the liked picture
	const handleDelete = (title) => {
		localStorage.deleteArrayItem('userPics', title);
		localStorage.removeItem(title);

		setLikedPics(JSON.parse(localStorage.getItem('userPics')));

		handleEmptyLikes();
	};

	// Sets user's liked pics from localStorage
	useEffect(() => {
		const savedPics = JSON.parse(localStorage.getItem('userPics'));

		setLikedPics(savedPics);
	}, [history, likedPics.length]);

	return (
		<div id='liked-pics'>
			<Header />
			<Banner as='h1'>Your Liked Photos</Banner>
			<div className='cards-main-container'>
				<section className='saved-cards-container'>
					<div className='cards'>
						{likedPics.map((pic) => {
							return (
								<LikedPicCard
									key={pic.title}
									likedPic={pic}
									handleDelete={handleDelete}
								/>
							);
						})}
					</div>
				</section>

				<Container>
					<footer>
						<Footer />
					</footer>
				</Container>
			</div>
		</div>
	);
};

export default LikedPics;
