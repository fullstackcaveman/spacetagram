import { Link, useHistory } from 'react-router-dom';
import {
	Form,
	Image,
	Header as MainHeader,
	Checkbox,
	Popup,
} from 'semantic-ui-react';
import PictureSelector from './PictureSelector';
import logo from '../../images/spacetagram-logo.png';

const Header = ({ isChecked, picDate, picQuality }) => {
	const history = useHistory();

	return (
		<MainHeader as='header' color='red' inverted>
			<nav className='header-content'>
				<Link to='/' className='header-logo'>
					<Image src={logo} size='tiny' alt='spacetagram logo' />
					<div className='spacetagram'>
						<h2 className='home-link'>Spacetagram</h2>
					</div>
				</Link>
				<div className='search-field'>
					<PictureSelector search={picDate} />

					{history.location.pathname === '/liked-pics' ? (
						<></>
					) : (
						<div className='high-def'>
							<Popup
								trigger={
									<Form inverted>
										<Form.Field
											id='hd-check'
											control={Checkbox}
											checked={isChecked}
											label={{ children: 'Display HD Photos' }}
											onClick={picQuality}
										/>
									</Form>
								}
								content='Check to display High-Res photos'
								inverted
								position='bottom left'
								size='mini'
							/>
						</div>
					)}
				</div>
			</nav>
		</MainHeader>
	);
};

export default Header;
