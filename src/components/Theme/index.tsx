import { useSelector } from 'react-redux';

import constants from '../../utils/constants';

const Theme = (background?) => {
  const { mode } = useSelector((state: any) => state.ui);

  const styles = {
    background: mode === 'dark' ? constants.darkMode : background || 'unset',
    color: mode === 'dark' ? '#fff' : '#000',
  };

  return styles;
};

export default Theme;
