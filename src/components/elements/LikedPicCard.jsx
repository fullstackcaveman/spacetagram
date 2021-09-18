import { useHistory } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';

const LikedPicCard = (props) => {
	const history = useHistory();
	const { likedPic, handleDelete } = props;

	const handleGoToPhoto = () => {
		history.push(`/${likedPic.date}`);
	};

	return (
		<Card>
			<Image src={likedPic.image} />
			<Card.Content textAlign='center'>
				<Card.Header className='card-pic-title'>{likedPic.title}</Card.Header>
			</Card.Content>
			<Card.Content extra textAlign='center'>
				<div className='card-btns'>
					<Button basic color='green' onClick={handleGoToPhoto}>
						Go To Photo
					</Button>
					<Button
						basic
						color='red'
						onClick={() => handleDelete(likedPic.title)}
					>
						Delete Photo
					</Button>
				</div>
			</Card.Content>
		</Card>
	);
};

export default LikedPicCard;
