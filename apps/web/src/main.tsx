import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App.tsx';
import './styles.css';

const root = document.getElementById('root');
if (!root) throw new Error('Root element is missing.');
ReactDOM.createRoot(root).render(<React.StrictMode><HashRouter><App /></HashRouter></React.StrictMode>);