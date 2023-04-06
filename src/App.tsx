import { Fragment, useEffect, useContext } from 'react';
import useRouteElement from './routes/useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { LocalStorageEventTarget } from './utils/auth';
import { AppContext } from './context/app.context';

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
    <Fragment>
      {routeElements}
      <ToastContainer />
    </Fragment>
  );
}

export default App;
