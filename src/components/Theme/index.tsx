import { useSelector } from 'react-redux';

const Theme = (background?) => {
  const { mode } = useSelector((state: any) => state.ui);

  const styles = {
    background: mode === 'dark' ? 'rgb(36, 39, 41) ' : background || 'unset',
    color: mode === 'dark' ? '#fff' : '#000',
  };

  return styles;
};

export default Theme;
