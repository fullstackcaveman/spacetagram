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

const SharePicture = (props) => {
	const { description, summary, source, title, hdurl, pathName } = props;

	const shareUrl = `https://nasa-potd.fullstackcaveman.com${pathName}`;

	return (
		<div className='social-shares-modal'>
			<div className='m5'>
				<FacebookShareButton
					quote={title}
					url={shareUrl}
					disabled={false}
					children={<FacebookIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<EmailShareButton
					subject={title}
					body='I found this cool photo...Check it out!'
					url={shareUrl}
					disabled={false}
					children={<EmailIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<LinkedinShareButton
					quote='Check this out!'
					source={source}
					summary={summary}
					title={title}
					url={shareUrl}
					disabled={false}
					children={<LinkedinIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<PinterestShareButton
					quote='Check this out!'
					url={shareUrl}
					media={hdurl}
					description={description}
					disabled={false}
					children={<PinterestIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<RedditShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<RedditIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<TelegramShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<TelegramIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<TwitterShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<TwitterIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
				<WhatsappShareButton
					quote='Check this out!'
					url={shareUrl}
					disabled={false}
					children={<WhatsappIcon round={true} size={40} />}
				/>
			</div>
			<div className='m5'>
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
