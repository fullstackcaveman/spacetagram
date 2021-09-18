import { useEffect, useState } from 'react';
import Background from './elements/Background';
import Header from './elements/Header';
import Footer from './elements/Footer';
import { Container, Header as Banner } from 'semantic-ui-react';
import LikedPicCard from './elements/LikedPicCard';

const LikedPics = () => {
	const [likedPics, setLikedPics] = useState([]);

	useEffect(() => {
		const savedPics = JSON.parse(localStorage.getItem('userPics'));

		setLikedPics(savedPics);
	}, []);

	const handleDelete = () => {
		console.log('handle delete called');
	};

	return (
		<div>
			<Background />
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
		</div>
	);
};

export default LikedPics;
