import { useSelector } from 'react-redux';

const Theme = (background?) => {
  const { mode } = useSelector((state: any) => state.ui);

  const styles = {
    background: mode === 'dark' ? '#011627' : background || 'unset',
    color: mode === 'dark' ? '#00C9B6' : '#000',
  };

  return styles;
};

export default Theme;
