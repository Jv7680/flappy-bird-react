import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../redux/hooks';

export default function Loading() {
    let isLoading = useAppSelector((state) => state.isLoading);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 9998 }}
            open={isLoading}
            onClick={() => { }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}