import { render /*, screen, waitFor*/ } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from './App';
import { act } from 'react-dom/test-utils';

beforeEach(() => {
	const history = createMemoryHistory();
	act(() => {
		render(
			<Router history={history}>
				<App />
			</Router>
		);
	});
});

test('should show martian', () => {
	expect(document.getElementById('martian')).toBeInTheDocument();
});
