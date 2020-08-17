/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useSelector } from 'react-redux';

import constants from '../../utils/constants';

const Theme = (background?: string) => {
  const { mode } = useSelector((state: { ui }) => state.ui);

  const styles = {
    background: mode === 'dark' ? constants.darkMode : background || 'unset',
    color: mode === 'dark' ? '#fff' : '#000',
  };

  return styles;
};

export default Theme;
