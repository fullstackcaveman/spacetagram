import React from 'react';
import { render, screen /*waitfor*/ } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../../App';

beforeEach(() => {
	const history = createMemoryHistory();
	render(
		<Router history={history}>
			<App />
		</Router>
	);
});

it('should display logo', () => {
	expect(screen.getByAltText('spacetagram logo')).toBeInTheDocument();
});

it('should display Spacetagram text', () => {
	expect(screen.getByText('Spacetagram')).toBeInTheDocument();
});

it('should display search component', () => {
	expect(screen.getByText('Search Date')).toBeInTheDocument();
	expect(document.getElementById('search-field')).toBeInTheDocument();
});

it('should display HD Photo option', () => {
	expect(screen.getByText('Display HD Photos')).toBeInTheDocument();
	expect(document.getElementById('hd-check')).toBeInTheDocument();
});
