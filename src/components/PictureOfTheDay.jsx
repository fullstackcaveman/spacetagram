import React, { useEffect, useState } from 'react';
import {
	Button,
	Container,
	Header,
	Icon,
	Image,
	Label,
	Loader,
} from 'semantic-ui-react';
import Footer from './elements/Footer';

const Picture = (props) => {
	const { copyright, date, description, image, loading, title } = props;

	// user likes would be set in a database to keep localStorage from getting too bloated
	const [isLiked, setIsLiked] = useState();
	// totalLikes state would come from a database in a full production app
	const [totalLikes, setTotalLikes] = useState(2048);

	useEffect(() => {
		const stickyLikes = localStorage.getItem(title);

		if (!stickyLikes) {
			setIsLiked(false);
		} else if (stickyLikes.split(',')[0] === 'true') {
			setTotalLikes(stickyLikes.split(',')[1]);
			setIsLiked(true);
		}
	}, [title]);

	const handleClick = () => {
		if (isLiked) {
			setTotalLikes(totalLikes - 1);
			setIsLiked(false);
		} else {
			setTotalLikes(totalLikes + 1);
			setIsLiked(true);
		}
	};

	const setLocalStorage = (element) => {
		if (isLiked) {
			handleClick();
			localStorage.removeItem(element.title);
		}
		if (!isLiked) {
			handleClick();
			// would write new like count to database in production app
			localStorage.setItem(element.title, ['true', totalLikes + 1]);
		}
	};

	return (
		<section className='picture-otd'>
			{loading ? (
				<Loader size='huge' inverted active>
					Contacting NASA...
				</Loader>
			) : (
				<Container className='flex-column'>
					<Header as='h1' color='teal' content={`${title} - ${copyright}`} />
					<Image src={image} alt={title} rounded centered />
					<Container>
						<div className='like-photo-btn'>
							<Button as='div' labelPosition='right'>
								<Button color={isLiked ? 'red' : 'teal'} onClick={handleClick}>
									<Icon name='heart' />
									{isLiked ? 'Liked' : 'Like'}
								</Button>
								<Label
									as='a'
									basic
									color={isLiked ? 'red' : 'teal'}
									pointing='left'
									onClick={() => setLocalStorage({ title })}
								>
									{totalLikes.toLocaleString()}
								</Label>
							</Button>
						</div>
					</Container>
					<Container text>
						<h3>{description}</h3>
					</Container>
					<Container>
						<footer>
							<div className='photo-copyright'>
								<p>Photo &copy; {copyright}</p>
								<p>Source: Nasa Picture of the day</p>
								<p>Date: {date}</p>
							</div>
							<Footer />
						</footer>
					</Container>
				</Container>
			)}
		</section>
	);
};

export default Picture;
