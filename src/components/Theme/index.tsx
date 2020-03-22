import { useSelector } from 'react-redux';





const Theme = () => {
    const { mode } = useSelector((state: any) => state.ui)

    const styles = {
        backgroundColor: mode === 'dark' ? '#011627' : '#fff',
        color: mode === 'dark' ? '#00C9B6' : '#000'
    }

    return styles
}

export default Theme