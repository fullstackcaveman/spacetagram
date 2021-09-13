import { Button, Icon } from 'semantic-ui-react';

const handleShare = () => {
	console.log('shared');
};

const ShareButton = () => {
	return (
		<div className='share-btn'>
			<Button color='teal' onClick={handleShare}>
				<Icon name='share square' />
				Share Photo
			</Button>
		</div>
	);
};

export default ShareButton;
