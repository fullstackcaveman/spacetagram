import React, { useState } from 'react';
import {
	Button,
	Container,
	Header,
	Icon,
	Image,
	Label,
} from 'semantic-ui-react';

const Picture = (props) => {
	const { title, image, description, copyright, date } = props;

	const [isLiked, setIsLiked] = useState(false);
	const [totalLikes, setTotalLikes] = useState(2048);

	const handleClick = () => {
		if (isLiked) {
			setTotalLikes(totalLikes - 1);
			setIsLiked(false);
		} else {
			setTotalLikes(totalLikes + 1);
			setIsLiked(true);
		}
	};

	return (
		<section className='picture-otd'>
			<Container className='flex-column'>
				<Header as='h2' color='red' content={`${title} - ${copyright}`} />
				<Image src={image} alt={title} rounded centered />
				<Container>
					<div className='like-photo-btn'>
						<Button as='div' labelPosition='right'>
							<Button color={isLiked ? 'red' : 'grey'} onClick={handleClick}>
								<Icon name='heart' />
								{isLiked ? 'Liked' : 'Like'}
							</Button>
							<Label
								as='a'
								basic
								color={isLiked ? 'red' : 'grey'}
								pointing='left'
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
						<p>&copy; {copyright}</p>
						<p>Source: Nasa Picture of the day</p>
						<p>Date: {date}</p>
					</footer>
				</Container>
			</Container>
		</section>
	);
};

export default Picture;
