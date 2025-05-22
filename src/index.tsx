import 'styles/App.css';
import ReactDOM from 'react-dom/client';
import App from 'components/App';
import 'helpers/global';
import { AppProvider } from 'context/AppContext';
import RootLayout from 'components/Layout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <AppProvider>
    <RootLayout>
      <App />
    </RootLayout>
  </AppProvider>,
);
