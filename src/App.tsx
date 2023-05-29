import { useEffect, useContext } from 'react';
import useRouteElement from './routes/useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext } from './context/app.context';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const routeElements = useRouteElement();
  const { reset } = useContext(AppContext);

  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset);
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset);
    };
  }, [reset]);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        {routeElements}
        <ToastContainer />
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;
