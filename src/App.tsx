import { Fragment } from 'react';
import useRouteElement from './routes/useRouteElement';

function App() {
  const routeElements = useRouteElement();
  return <Fragment>{routeElements}</Fragment>;
}

export default App;
