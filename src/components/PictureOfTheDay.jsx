import React, { useState } from 'react';
import {
	Button,
	Container,
	Header,
	Icon,
	Image,
	Label,
} from 'semantic-ui-react';

// const Container = styled.div`
// 	display: flex;
// 	flex-direction: column;
// 	justify-content: center;
// 	align-items: center;
// 	text-align: center;
// `;

// const H1 = styled.h1`
// 	font-size: 3rem;
// 	font-weight: bold;
// 	margin: 30px auto;
// `;

// const Description = styled.div`
// 	margin: 10px auto 30px;
// 	padding: 10px;
// 	font-size: 1.3rem;
// 	width: 1024px;
// `;

// const Footer = styled.div`
// 	width: 99%;
// 	background-color: #000;
// 	padding: 10px;
// 	color: #fff;
// `;

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
		<Container>
			<Header as='h2' content={`${title} - ${copyright}`} />

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
							{totalLikes}
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
	);
};

export default Picture;
