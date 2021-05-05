import Index from '../pages/index';
import App from '../pages/app';

const routeOptions = [
  {
    path: '/',
    exact: true,
    component: Index,
  },
  {
    path: '/rewards',
    exact: true,
    component: App,
  },
];

const route = ({ path, exact, component }) => ({
  path,
  exact,
  component,
});

const routes = routeOptions.map(route);

export default routes;
