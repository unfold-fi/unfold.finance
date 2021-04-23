import development from './development';
import staging from './staging';
import production from './production';

const env = process.env.REACT_APP_CONFIG_ENV || 'production';

const config = {
  development,
  production,
  staging,
};

export default config[env];
