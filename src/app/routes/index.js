import Index from '../pages/index';
import App from '../pages/app';

const routeOptions = [
  {
    path: '/',
    exact: true,
    component: Index,
  },
  {
    path: '/app',
    exact: true,
    component: App,
  },
];

const route = (options) => ({
  path: options.path,
  exact: options.exact,
  component: options.component,
});

const routes = routeOptions.map(route);

export default routes;
