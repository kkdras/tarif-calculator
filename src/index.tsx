import ReactDom from 'react-dom/client';
import React from 'react';
import { App } from './app';
import { StoreProvider } from './store';

const mainEl = document.getElementById('root') as HTMLElement;
const root = ReactDom.createRoot(mainEl);

root.render(
	<StoreProvider>
		<App />
	</StoreProvider>
);
