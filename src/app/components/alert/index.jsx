import React from 'react';
import { useSelector } from 'react-redux';

import { Container } from './styles';

import Alert from './alert';

const AlertView = () => {
  const { collection } = useSelector((state) => state.alert);
  const alerts = Object.values(collection).filter(({ closed }) => !closed);

  return (
    <Container>
      {alerts.map((item) => (
        <Alert alert={item} key={item.id} autoClose={false} />
      ))}
    </Container>
  );
};

export default AlertView;
