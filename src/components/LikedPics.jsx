import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Background from './elements/Background';
import Header from './elements/Header';
import Footer from './elements/Footer';
import { Container, Header as Banner } from 'semantic-ui-react';
import LikedPicCard from './elements/LikedPicCard';

const LikedPics = () => {
	const history = useHistory();
	const [likedPics, setLikedPics] = useState([]);

	Storage.prototype.deleteArrayItem = function (arrayName, itemTitle) {
		let existingArray = this.getArray(arrayName);
		const index = existingArray.findIndex((item) => item.title === itemTitle);
		existingArray.splice(index, 1);
		this.setItem(arrayName, JSON.stringify(existingArray));
	};

	const handleEmptyLikes = () => {
		if (likedPics.length - 1 === 0) {
			history.push('/');
		}
	};

	const handleDelete = (title) => {
		localStorage.deleteArrayItem('userPics', title);
		localStorage.removeItem(title);

		setLikedPics(JSON.parse(localStorage.getItem('userPics')));

		handleEmptyLikes();
	};

	useEffect(() => {
		const savedPics = JSON.parse(localStorage.getItem('userPics'));

		setLikedPics(savedPics);
	}, [history, likedPics.length]);

	return (
		<div>
			<Header />
			<Banner as='h1'>Your Saved Photos</Banner>
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
			<Background />
		</div>
	);
};

export default LikedPics;
