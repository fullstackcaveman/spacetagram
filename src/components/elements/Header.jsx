import { Link } from 'react-router-dom';
import { Form, Image, Header as MainHeader, Checkbox } from 'semantic-ui-react';
import PictureSelector from './PictureSelector';
import logo from '../../images/spacetagram-logo.png';

const Header = ({ isChecked, picDate, setPicDate, picQuality }) => {
	return (
		<MainHeader as='header' color='red' inverted>
			<div className='header-content'>
				<Link to='/' className='header-logo'>
					<Image src={logo} size='tiny' alt='spacetagram logo' />
					<div className='spacetagram'>
						<h2 className='home-link'>Spacetagram</h2>
					</div>
				</Link>
				<div className='search-field'>
					<PictureSelector search={new Date()} />
					<div className='high-def'>
						<Form inverted>
							<Form.Field
								control={Checkbox}
								checked={isChecked}
								label={{ children: 'Display HD Photos' }}
								onClick={picQuality}
							/>
						</Form>
					</div>
				</div>
			</div>
		</MainHeader>
	);
};

export default Header;
