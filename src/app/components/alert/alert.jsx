import React from 'react';
import { useDispatch } from 'react-redux';

import { close } from '../../store/slices/alert';
import { Item, Close, Message, IconImage } from './styles';

import config from '../../../config';
import IconClose from '../../assets/icons/icon-close-modal.svg';

const AlertComponent = ({
  alert,
  autoClose = true,
  autoCloseTimeout = 30000,
}) => {
  const dispatch = useDispatch();
  const [closeTimerId, setCloseTimerId] = React.useState(null);

  const initAutoClose = () => {
    if (autoClose) {
      const timerId = setTimeout(() => {
        dispatch(close(alert.id));
      }, autoCloseTimeout);

      setCloseTimerId(timerId);
    }
  };

  const onMouseEnter = () => {
    clearTimeout(closeTimerId);
  };

  const onMouseLeave = () => {
    initAutoClose();
  };

  React.useEffect(() => {
    initAutoClose();
  }, [autoClose]);

  return (
    <Item onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Message.Container>
        <Message.Text>{alert.message}</Message.Text>
        {alert.hash && (
          <Message.Link
            href={config.EtherScanUri + '/tx/' + alert.hash}
            target="_blank"
          >
            View on Etherscan
          </Message.Link>
        )}
      </Message.Container>
      <Close onClick={() => dispatch(close(alert.id))}>
        <IconImage src={IconClose} alt="Close" />
      </Close>
    </Item>
  );
};

export default AlertComponent;
