import routesPaths from 'constants/routesPaths';
import HomePage from 'containers/HomePage';
import LoginPage from 'containers/LoginPage';
import NotFoundPage from 'containers/NotFoundPage';
import SignUpPage from 'containers/SignUpPage';

const routes = [
  {
    path: routesPaths.index,
    component: HomePage,
    exact: true,
    private: true
  },
  {
    path: routesPaths.home,
    component: HomePage,
  },
  {
    path: routesPaths.login,
    component: LoginPage
  },
  {
    path: routesPaths.signUp,
    component: SignUpPage
  },
  {
    path: routesPaths.about,
    component: HomePage
  },
  {
    component: NotFoundPage
  }
];

export default routes;
