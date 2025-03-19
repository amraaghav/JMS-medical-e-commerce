import { render } from 'preact'
import './index.css'
import App from './app';
import { AuthProvider } from "./context/AuthContext";

render(<App />, document.getElementById('app'))
