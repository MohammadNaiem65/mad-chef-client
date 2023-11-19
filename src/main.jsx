import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import routes from './routes/routes.jsx';
import store from './app/store.js';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<HelmetProvider>
				<RouterProvider router={routes} />
			</HelmetProvider>
		</Provider>
	</React.StrictMode>
);
