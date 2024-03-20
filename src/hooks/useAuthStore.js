import { useDispatch, useSelector } from 'react-redux'
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store/auth/authSlice';
import { onLogoutCalendar } from '../store/calendar/calendarSlice';


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

    } catch (error) {
        dispatch(onLogout('Credenciales incorrectas'));

        setTimeout(()=> {
            dispatch(clearErrorMessage());
        }, 100)
    }
}

const startRegister = async({ name, email, password, revalidPassword })=> {
    try {
        const res = await calendarApi.post('/auth/register', {name, email, password, revalidPassword });
        dispatch(onChecking());
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin( {name: res.data.name, uid: res.data.uid} ));

    } catch (error) {
        dispatch(onLogout(error.response.data?.msg || 'Error de registro, intente nuevamente'));

        setTimeout(()=> {
            dispatch(clearErrorMessage());
        }, 100)
    }
}

const checkAuthToken = async() => {
    const token = localStorage.getItem('token');
    if(!token) return dispatch(onLogout());

    try {
        const {data} = await calendarApi.get('/auth/revalidtoken');
        localStorage.setItem('token', data.token);
        localStorage.setItem('token-init-date', new Date().getTime());
        dispatch(onLogin({name: data.name, uid: data.uid}));

    } catch (error) {
        localStorage.clear();
        dispatch(onLogout());
    }
}

const startAuthLogout = ()=> {
    localStorage.clear();
    dispatch(onLogoutCalendar())
    dispatch(onLogout());
}

    return{
        //*Exportar propiedades
        status,
        user,
        errorMessage,

        //*Exportar Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startAuthLogout,
    }
}