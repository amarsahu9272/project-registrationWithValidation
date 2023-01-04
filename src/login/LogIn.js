import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './LogIn.module.css'
import PersonIcon from '@mui/icons-material/Person';

function LogIn() {
    const initialValues = { username: "", password: "" };
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
                    <input className={style.user} type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange} />
                    <p style={{ color: "red" }}>{formErrors.username}</p>
                    <input className={style.pass} type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} />
                    <p style={{ color: "red" }}>{formErrors.password}</p>
                    <div className={style.btn}>
                        <p>Don't have an account?<br /><Link to='/register/Register'>Register</Link></p>
                        <button>Login</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default LogIn
