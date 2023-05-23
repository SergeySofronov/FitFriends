import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import { AppRoute } from '../const';
import Intro from '../pages/intro/intro';
import SingIn from '../pages/sing-in/sing-in';
import SingUp from '../pages/sing-up/sing-up';
import CreateTraining from '../pages/create-training/create-training';

const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path={AppRoute.Intro} element={<Intro />} />
    <Route path={AppRoute.Login} element={<SingIn />} />
    <Route path={AppRoute.Register} element={<SingUp />} />
    <Route path={AppRoute.CreateTraining} element={<CreateTraining />} />

    <Route path={AppRoute.Main} element={<CreateTraining />} />
    <Route path={AppRoute.Account} element={<CreateTraining />} />
    <Route path={AppRoute.Friends} element={<CreateTraining />} />
    <Route path={AppRoute.Notifications} element={<CreateTraining />} />
    <Route path={AppRoute.UsersCatalog} element={<CreateTraining />} />

    <Route path="*" element={<Intro />} />
  </>
))

function App(): JSX.Element {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
