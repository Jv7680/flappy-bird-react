import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../redux/hooks';

export default function Loading() {
    let isLoading = useAppSelector((state) => state.isLoading);

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: 10000 }}
            open={isLoading}
            onClick={() => { }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}