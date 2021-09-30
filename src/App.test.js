import React from 'react';
import { render /*, screen, waitFor*/ } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';

// const martianBtn = screen.getByText('See Random Picture');

test('should render app without errors', () => {
	const history = createMemoryHistory();
	render(
		<Router history={history}>
			<App />
		</Router>
	);
});
