import ReactDom from 'react-dom/client';
import React from 'react';

const mainEl = document.getElementById('root') as HTMLElement;
const root = ReactDom.createRoot(mainEl);

root.render(<div>Hello world</div>);
