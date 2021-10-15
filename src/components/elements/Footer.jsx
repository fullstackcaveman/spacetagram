import { Icon } from 'semantic-ui-react';

const Footer = () => {
	const thisYear = new Date().getFullYear().toString();

	return (
		<div className='footer-bottom'>
			<h2>
				&copy;{thisYear}
				{/* eslint-disable-next-line */}
				<a href='https://fullstackcaveman.com' target='_blank' rel='noopener'>
					{' '}
					FullStackCaveman
				</a>{' '}
				|{' '}
				<a
					href='https://github.com/fullstackcaveman'
					target='_blank'
					rel='noreferrer nofollow noopener'
				>
					<Icon className='github' /> GitHub
				</a>{' '}
				|{' '}
				<a
					href='https://linkedin.com/in/fullstackcaveman/'
					target='_blank'
					rel='noreferrer nofollow noopener'
				>
					{' '}
					<Icon className='linkedin' /> LinkedIn
				</a>
			</h2>
		</div>
	);
};

export default Footer;
