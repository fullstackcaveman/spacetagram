import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
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
import ShareButton from './elements/ShareButton';
import ShareModal from './elements/ShareModal';

const Picture = (props) => {
	const {
		copyright,
		date,
		description,
		hdurl,
		image,
		loading,
		mediaType,
		thumbs,
		title,
	} = props;

	const history = useHistory();

	// user likes would be set in a database to keep localStorage from getting too bloated
	const [isLiked, setIsLiked] = useState();
	// totalLikes state would come from a database in a full production app
	const [totalLikes, setTotalLikes] = useState(2048);
	const [openModal, setOpenModal] = useState(false);

	useEffect(() => {
		const stickyLikes = localStorage.getItem(title);

		if (!stickyLikes) {
			setIsLiked(false);
		} else if (stickyLikes.split(',')[0] === 'true') {
			setTotalLikes(parseInt(stickyLikes.split(',')[1]));
			setIsLiked(true);
		}
	}, [title]);

	const setLocalStorage = (element) => {
		if (isLiked) {
			setTotalLikes(totalLikes - 1);
			setIsLiked(false);
			localStorage.removeItem(element.title);
		}
		if (!isLiked) {
			setTotalLikes(totalLikes + 1);
			setIsLiked(true);
			localStorage.setItem(element.title, ['true', totalLikes + 1]);
		}
	};

	const handleShowSocials = () => {
		setOpenModal(!openModal);
	};

	return (
		<section className='picture-otd'>
			{loading ? (
				<Loader size='huge' inverted active>
					Contacting NASA...
				</Loader>
			) : (
				<Container className='flex-column'>
					{copyright === 'Unknown' ? (
						<Header as='h1' color='teal' content={`${title}`} />
					) : (
						<Header as='h1' color='teal' content={`${title} - ${copyright}`} />
					)}
					<Container className='picture-section'>
						{mediaType === 'video' ? (
							<Image src={thumbs} alt={title} rounded centered />
						) : (
							<Image src={image} alt={title} rounded centered />
						)}
					</Container>
					<Container>
						<div className='like-photo-btn'>
							<Button as='div' labelPosition='right'>
								<Button
									className='glow-on-hover'
									color={isLiked ? 'red' : 'teal'}
									onClick={() => setLocalStorage({ title })}
								>
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
							<Link to='/liked-pics'>
								<Button
									color='blue'
									className='glow-on-hover'
									id='show-liked-pics'
								>
									Show Liked Pics
								</Button>
							</Link>
							<ShareButton showSocials={handleShowSocials} />
						</div>
					</Container>
					<Container text>
						<h3>{description}</h3>
					</Container>
					<Container>
						<footer className='footer-top'>
							<div className='photo-copyright'>
								{copyright === 'Unknown' ? (
									<>
										<p>Source: Nasa Picture of the day</p>
										<p>Date: {date}</p>
									</>
								) : (
									<>
										<p>Photo &copy; {copyright}</p>
										<p>Source: Nasa Picture of the day</p>
										<p>Date: {date}</p>
									</>
								)}
							</div>
							<Footer />
						</footer>
					</Container>
					<ShareModal
						summary={description}
						source='https://nasa-potd.fullstackcaveman.com'
						title={title}
						description={description}
						hdurl={hdurl}
						openModal={openModal}
						pathName={history.location.pathname}
						setOpenModal={setOpenModal}
					/>
				</Container>
			)}
		</section>
	);
};

export default Picture;
