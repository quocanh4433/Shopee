import { Fragment } from 'react';
import useRouteElement from './routes/useRouteElement';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const routeElements = useRouteElement();
  return (
    <Fragment>
      {routeElements}
      <ToastContainer />
    </Fragment>
  );
}

export default App;
