import useRouteElement from './routes/useRouteElement';

function App() {
  const routeElements = useRouteElement();
  return <section>{routeElements}</section>;
}

export default App;
