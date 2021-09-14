import {
	EmailShareButton,
	FacebookShareButton,
	LinkedinShareButton,
	PinterestShareButton,
	RedditShareButton,
	TelegramShareButton,
	TumblrShareButton,
	TwitterShareButton,
	WhatsappShareButton,
} from 'react-share';
import {
	EmailIcon,
	FacebookIcon,
	LinkedinIcon,
	PinterestIcon,
	RedditIcon,
	TelegramIcon,
	TumblrIcon,
	TwitterIcon,
	WhatsappIcon,
} from 'react-share';

const SharePicture = ({ description, hdurl, pathName }) => {
	const shareUrl = `https://nasa-potd.fullstackcaveman.com${pathName}`;

	return (
		<div className='social-shares-modal'>
			<div>
				<FacebookShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<FacebookIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<EmailShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<EmailIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<LinkedinShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<LinkedinIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<PinterestShareButton
					quote='Check this out!'
					url={shareUrl}
					media={hdurl}
					description={description}
					disabled={false}
					children={<PinterestIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<RedditShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<RedditIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<TelegramShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<TelegramIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<TwitterShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<TwitterIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<WhatsappShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<WhatsappIcon round={true} size={40} />}
				/>
			</div>
			<div>
				<TumblrShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<TumblrIcon round={true} size={40} />}
				/>
			</div>
		</div>
	);
};

export default SharePicture;
