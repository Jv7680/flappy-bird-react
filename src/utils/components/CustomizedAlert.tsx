import { useNavigate, NavigateFunction } from "react-router-dom";
import Swal from 'sweetalert2';

// use this function to navigate outside a react component
export let customizedNavigate: NavigateFunction;

export default function CustomizedAlert() {
    customizedNavigate = useNavigate();

    return null;
};