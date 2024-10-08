import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import './Login.modules.scss'

const errorMessages = {
    invalidEmail: 'Email is not valid',
    invalidPassword: 'Password must be 6-12 characters long, include at least one uppercase letter, one lowercase letter, at least one occurrence of the digit "3" and one special character',
    passwordsDoNotMatch: 'Passwords do not match',
};

enum InputField {
    Email = 'email',
    Password = 'password',
    ConfirmPassword = 'confirmPassword'
}

const Login: React.FC<{ edit: boolean }> = ({ edit }) => {
    const { setUserData } = useOutletContext<{ setUserData: React.Dispatch<React.SetStateAction<boolean>> }>();
    const [loginFormData, setLoginformData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [submitValidation, setSubmitValidation] = useState({
        validEmail: false,
        validPassword: false,
        validPasswordMatch: false,
    })
    const canSubmit = !(submitValidation.validEmail &&
        submitValidation.validPassword &&
        submitValidation.validPasswordMatch);
    const navigate = useNavigate();

    useEffect(() => {
        if (edit) {
            const userStr = String(localStorage.getItem('loginData'));
            const user = JSON.parse(userStr);
            validateInput('email', user.email)
            setLoginformData({
                email: user.email,
                password: '',
                confirmPassword: ''
            })
        }
    }, [edit])


    const validateInput = (name: string, value: string) => {
        const {
            invalidEmail,
            invalidPassword,
            passwordsDoNotMatch
        } = errorMessages;
        const { password } = loginFormData
        const { Email, Password, ConfirmPassword } = InputField;
        if (name === Email) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email:
                    !validateEmail(value)
                        ? invalidEmail
                        : '',
            }))
        }
        if (name === Password) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                password:
                    !validatePassword(value)
                        ? invalidPassword
                        : '',
            }))
        }
        if (name === ConfirmPassword) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                confirmPassword:
                    !validateConfirmPassword(password, value)
                        ? passwordsDoNotMatch
                        : '',
            }))
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        validateInput(name, value);
        setLoginformData({
            ...loginFormData,
            [name]: value
        });
    }

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setSubmitValidation({
                ...submitValidation,
                validEmail: true
            })
            return true
        } else {

            setSubmitValidation({
                ...submitValidation,
                validEmail: false
            })
            return false
        }
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[3])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,12}$/;
        if (passwordRegex.test(password)) {
            setSubmitValidation({
                ...submitValidation,
                validPassword: true
            })
            return true
        } else {
            setSubmitValidation({
                ...submitValidation,
                validPassword: false
            })
            return false
        }
    };

    const validateConfirmPassword = (password: string, confirmPassword: string) => {
        if (password === confirmPassword) {
            setSubmitValidation({
                ...submitValidation,
                validPasswordMatch: true
            })
            return true
        } else {
            setSubmitValidation({
                ...submitValidation,
                validPasswordMatch: false
            })
            return false
        }
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        localStorage.setItem('loginData', JSON.stringify(loginFormData));
        if (!edit) setUserData(true);
        navigate('/products');
    };

    return (
        <div className="loginContainer">
            <h1>{edit ? 'Edit User' : 'Login'}</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">{edit ? 'Edit Email: ' : 'Email: '}</label>
                    <input
                        type="email"
                        name="email"
                        value={loginFormData.email}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label htmlFor="password">{edit ? 'Edit Password: ' : 'Password: '}</label>
                    <input
                        name="password"
                        type="password"
                        value={loginFormData.password}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div>
                    <label htmlFor="confirmPassword">{edit ? 'Edit Confirm Password: ' : 'Confirm Password: '}</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={loginFormData.confirmPassword}
                        onChange={handleInputChange}
                        required
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>

                <div className="buttonContainer">
                    <button type="submit" disabled={canSubmit}>{edit ? 'Edit' : 'Login'}</button>
                </div>
            </form>
        </div>
    );
};

export default Login;