import { Icon } from 'semantic-ui-react';

const Footer = () => {
	return (
		<div className='footer-bottom'>
			<h2>
				&copy;FullStackCaveman |{' '}
				<a
					href='https://github.com/fullstackcaveman'
					target='_blank'
					rel='noreferrer nofollow'
				>
					<Icon className='github' /> GitHub
				</a>{' '}
				|{' '}
				<a
					href='https://linkedin.com/in/fullstackcaveman/'
					target='_blank'
					rel='noreferrer nofollow'
				>
					{' '}
					<Icon className='linkedin' /> LinkedIn
				</a>
			</h2>
		</div>
	);
};

export default Footer;
