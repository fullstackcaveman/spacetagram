import { Button, Header, Modal } from 'semantic-ui-react';
import SharePicture from './SharePicture';

const ShareModal = ({
	description,
	hdurl,
	openModal,
	pathName,
	setOpenModal,
}) => {
	return (
		<Modal dimmer='blurring' open={openModal}>
			<Modal.Header>Share Photo</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<Header>Share With Your Network</Header>
					<SharePicture
						pathName={pathName}
						description={description}
						hdurl={hdurl}
					/>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					color='teal'
					icon='thumbs up'
					content='All Done'
					onClick={() => setOpenModal(false)}
				/>
			</Modal.Actions>
		</Modal>
	);
};

export default ShareModal;
