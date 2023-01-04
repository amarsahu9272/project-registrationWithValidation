import React, { useEffect, useState } from 'react'
import style from './Register.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, ThemeProvider, createTheme } from '@mui/system';

function Register() {
    const initialValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    useEffect(() => {
        // console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            // console.log(formValues);
        }
    }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={style.outer}>
                    {Object.keys(formErrors).length === 0 && isSubmit ? (<div style={{ color: "green" }}>Signed in successfully</div>) : null}
                    {/* (<pre>{JSON.stringify(formValues, undefined, 2)}</pre>) */}
                    <div><AccountCircleIcon color='primary' fontSize='large' /></div>
                    <input className={style.email} type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} />
                    <p style={{ color: "red" }}>{formErrors.email}</p>
                    <input className={style.user} type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange} />
                    <p style={{ color: "red" }}>{formErrors.username}</p>
                    <input className={style.pass} type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
                    <p style={{ color: "red" }}>{formErrors.password}</p>
                    <div className={style.btn}>
                        <button>Register</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Register
