import React from 'react';
import ReactDOM from 'react-dom';
import ThemeProvider from './components/ThemeProvider';
import App from './components/App';
import CssBaseline from '@material-ui/core/CssBaseline';
import './scss/main.scss';
import { store } from './mobx/store';
import { Provider } from 'mobx-react';

ReactDOM.render(
	<Provider store={store}>
		<ThemeProvider>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</Provider>,
	document.getElementById('root')
);
