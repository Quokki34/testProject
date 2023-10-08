"use client";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import style from './page.module.css';
import  { Token } from "@/context/context";
import { useRouter } from "next/navigation";


const page = () => {
    const {setToken} = useContext(Token);
    const [password, setPassword] = useState(''); 
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const ttk = localStorage.getItem('token');
    }, [])

    const LoginHandler = () => {
        if (userName === '' || password === '') return setError('Not all fields are filled in')

        axios({
            url:"https://fakestoreapi.com/auth/login",
            method:"POST",
            data: {
                username: userName,
                password: password
            },
        }).then((res) => {
            localStorage.setItem('token', res.data.token);
            setToken(localStorage.getItem('token'));
            router.push('/product');
        })
        .catch((err) => {
            setError(err.response.data);
        });
    };


    return (
            <div className={style.wrapper}>
            <div className={style.container}>
                <div className={style.header}>

                    <div className={style.text}>Log in to your account</div>
                    <div className={style.underline}></div>
                    <label>{error}</label> 

                </div>

                <div className={style.inputs}>

                    <input type="text" placeholder="login" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                    <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                </div>

                <button className={style.btn} onClick={LoginHandler}>sign in</button>

            </div>
        </div>
       
    )
};

export default page;








