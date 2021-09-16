import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './fonts/Billion-Dreams.TTF';
import 'semantic-ui-css/semantic.min.css';
import './styles.css';

ReactDOM.render(
	<Router>
		<App />
	</Router>,

	document.getElementById('root')
);
