import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';
import { onChecking, onLogin, onLogout } from '../store/auth/authSlice';


export const useAuthStore = () => {

const { status, user, errorMessage } = useSelector(state => state.auth);
const dispatch = useDispatch();

const startLogin = async({ email, password })=> {
    try {
        const res = await calendarApi.post('/auth/login', { email, password });
        dispatch(onChecking());
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin( {name: res.data.name, uid: res.data.uid} ));

        return res.data.user;
    } catch (error) {
        console.log(error);
        dispatch(onLogout('Credenciales incorrectas'));
        setTimeout(() => {
            dispatch(onLogout(undefined));
        }
        , 10);
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