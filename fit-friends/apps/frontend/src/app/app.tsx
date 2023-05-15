import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AppRoute } from '../const';
import Root from '../pages/root/root';
import Main from '../pages/main/main';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path={AppRoute.Root} element={<Root />}>
    <Route path={AppRoute.Main} element={<Main />} />
  </Route>
))

function App(): JSX.Element {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
