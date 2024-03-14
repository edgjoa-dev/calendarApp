import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';


export const useAuthStore = () => {

const { status, user, errorMessage } = useSelector(state => state.auth);
const dispatch = useDispatch();

const startLogin = async({ email, password })=> {
    try {
        const res = await calendarApi.post('/auth/login', { email, password });
        console.log({res});
    } catch (error) {
        console.log(error);
    }
}

    return{
        //*Exportar propiedades
        status,
        user,
        errorMessage,

        //*Exportar Métodos
        startLogin,
    }
}