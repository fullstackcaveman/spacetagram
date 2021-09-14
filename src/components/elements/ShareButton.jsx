import { Button, Icon } from 'semantic-ui-react';

const ShareButton = ({ showSocials }) => {
	const handleShare = () => {
		showSocials();
	};

	return (
		<div className='share-btn'>
			<Button color='teal' onClick={handleShare}>
				<Icon name='share alternate' />
				Share Photo
			</Button>
		</div>
	);
};

export default ShareButton;
