import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MapContainer from './components/map/MapContainer';
import { positions, Provider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

const options = {
    timeout: 5000,
    position: positions.BOTTOM_CENTER
};

ReactDOM.render(
    <React.StrictMode>
        <Provider template={AlertTemplate} {...options}>
            <MapContainer></MapContainer>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
