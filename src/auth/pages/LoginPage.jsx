import { toast, Toaster } from 'react-hot-toast';


import { useEffect } from 'react'
import { useAuthStore, useForm } from '../../hooks'

import './LoginPage.css'


    const loginFormFields = {
        loginEmail: "",
        loginPassword: "",
    }

    const registerFormField = {
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerPassword2: "",
    }

    export const LoginPage = () => {

    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields )
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormField)

    const onLoginSubmit = (e)=> {
        e.preventDefault();

        if (!/^[^\s@]+@gmail\.com$/.test(loginEmail)) {
            toast.error('Por favor, ingresa un correo electrónico válido de Gmail.');
            return;
            }
        if (loginPassword.length < 9 || !/\d/.test(loginPassword) || !/[a-z]/.test(loginPassword) || !/[A-Z]/.test(loginPassword) || !/[!¡@#*]+/.test(loginPassword)) {
            toast.error('La contraseña debe tener al menos 9 caracteres, incluyendo mayúsculas, minúsculas, números y al menos uno de los siguientes signos: !¡@#*');
            return;
            }

        startLogin({ email: loginEmail, password: loginPassword });
    }

    const onRegisterSubmit = (e)=> {
        e.preventDefault();

        if(registerName.length < 3){
            toast.error('El nombre debe tener al menos 3 caracteres');
            return;
        }

        if (!/^[^\s@]+@gmail\.com$/.test(registerEmail)) {
            toast.error('Por favor, ingresa un correo electrónico válido de Gmail.');
            return;
            }

        if(registerPassword !== registerPassword2){
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            toast.error('Las contraseñas deben coincidir, intenta nuevamente');
        }

        if (registerPassword.length < 9 || !/\d/.test(registerPassword) || !/[a-z]/.test(registerPassword) || !/[A-Z]/.test(registerPassword) || !/[!¡@#*]+/.test(registerPassword)) {
        toast.error('La contraseña debe tener al menos 9 caracteres, incluyendo mayúsculas, minúsculas, números y al menos uno de los siguientes signos: !¡@#*');
        return;
        }



        startRegister({ name: registerName, email: registerEmail, password: registerPassword, revalidPassword: registerPassword2});
    }

    useEffect(()=>{
        if( errorMessage !== undefined ) {
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            toast.error(errorMessage);
        }
    },[ errorMessage ]);

    return (
        <div className="container login-container">
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ onLoginSubmit } >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ onRegisterSubmit } >
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerPassword2'
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}