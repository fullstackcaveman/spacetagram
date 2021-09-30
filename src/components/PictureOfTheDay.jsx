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
import martianRunning from '../images/martian-running.png';

// If there are 4 or less props, I'll destructure them where "props" is.
const PictureOfTheDay = (props) => {
	// I prefer to destructure the following way when the first line of the component function declaration breaks to a new line. I like to see the declaration on one line for better readability.
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

	// Used to set initial likes on an unliked photo. Range is 1,000 to 10,000
	const rndNum = Math.floor(Math.random() * (10000 - 1000) + 1000);

	// User likes would be set in a database to keep localStorage from getting too bloated
	const [isLiked, setIsLiked] = useState();
	// totalLikes state would come from a database in a full production app
	const [totalLikes, setTotalLikes] = useState(rndNum);
	const [openModal, setOpenModal] = useState(false);
	const [disabled, setDisabled] = useState(true);

	// Helper functions that make working with localStorage easier
	Storage.prototype.getArray = function (arrayName) {
		let thisArray = [];
		const fetchArrayObj = this.getItem(arrayName);

		if (typeof fetchArrayObj !== 'undefined') {
			if (fetchArrayObj !== null) {
				thisArray = JSON.parse(fetchArrayObj);
			}
		}
		return thisArray;
	};

	Storage.prototype.pushArrayItem = function (arrayName, arrayItem) {
		let existingArray = this.getArray(arrayName);
		existingArray.push(arrayItem);
		this.setItem(arrayName, JSON.stringify(existingArray));
	};

	Storage.prototype.deleteArrayItem = function (arrayName, itemTitle) {
		let existingArray = this.getArray(arrayName);
		const index = existingArray.findIndex((item) => item.title === itemTitle);
		existingArray.splice(index, 1);
		this.setItem(arrayName, JSON.stringify(existingArray));
	};
	// End localStorage helper functions

	useEffect(() => {
		// Assigns localStorage key={title} to variable
		const stickyLikes = localStorage.getItem(title);

		if (!stickyLikes) {
			// Sets isLiked to false if there is no localStorage of key={title}
			setIsLiked(false);
		} else if (stickyLikes.split(',')[0] === 'true') {
			// Parses out element[1] (total likes) from localStorage as an integer
			setTotalLikes(parseInt(stickyLikes.split(',')[1]));
			setIsLiked(true);
		}
	}, [title]);

	// Sets the user's liked pics from localStorage to variable
	const userLikedPics = JSON.parse(localStorage.getItem('userPics'));

	useEffect(() => {
		if (!localStorage.getItem('userPics')) {
			localStorage.setItem('userPics', JSON.stringify([]));
		}

		// Disables (hides) Show Liked Pics button if there are no liked pics
		if (JSON.parse(localStorage.getItem('userPics')).length > 0) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [userLikedPics]);

	// Function for updating a picture's total likes
	const setLocalStorage = (element) => {
		if (isLiked) {
			setTotalLikes(totalLikes - 1);
			setIsLiked(false);
			localStorage.removeItem(element.title);
			localStorage.deleteArrayItem('userPics', title);
		}
		if (!isLiked) {
			setTotalLikes(totalLikes + 1);
			setIsLiked(true);
			localStorage.pushArrayItem('userPics', props);
			localStorage.setItem(element.title, ['true', totalLikes + 1]);
		}
	};

	// Opens/Closes share modal
	const handleShowSocials = () => {
		setOpenModal(!openModal);
	};

	return (
		<main className='picture-otd'>
			{loading ? (
				<Loader size='huge' inverted active>
					<div className='contacting-nasa'>
						Contacting NASA...{' '}
						<Image
							src={martianRunning}
							alt='Martian Running'
							className='running-martian'
						/>
					</div>
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
							<Button as='div' labelPosition='right' id='like-btn'>
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

							{!disabled ? (
								<Link to='/liked-pics'>
									<Button
										color='blue'
										className='glow-on-hover'
										id='show-liked-pics'
										disabled={disabled}
									>
										Show Liked Pics
									</Button>
								</Link>
							) : (
								<></>
							)}

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
		</main>
	);
};

export default PictureOfTheDay;
