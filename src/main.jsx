import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const root = document.getElementById('root');
const app = (
  <StrictMode>
    <App initialPath={window.location.pathname} />
  </StrictMode>
);

// En producción el HTML viene prerenderizado: se hidrata. En desarrollo se monta de cero.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
