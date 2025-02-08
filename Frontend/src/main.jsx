import { render } from 'preact';
import './index.css';
import { App } from './app.jsx';
import { MyProvider } from './context/LetterContext.jsx'; 
import { BrowserRouter } from 'react-router-dom';

render(
    <MyProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </MyProvider>,
    document.getElementById('app')
);
