import { Fragment, useEffect, useContext } from 'react';
import useRouteElement from './routes/useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext, AppProvider } from './context/app.context';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ErrorBoundary from './components/ErrorBoundary';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0
    }
  }
});

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
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <ErrorBoundary>
            {routeElements}
            <ToastContainer />
          </ErrorBoundary>
        </AppProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
