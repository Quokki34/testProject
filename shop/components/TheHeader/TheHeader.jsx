"use client";
import Link from 'next/link';
import style from './TheHeader.module.css'
import React  from 'react';

const TheHeader = () => {
    
    return (
        <>
            <div className={style.head}>
                <div className={style.menu}>
                    <div className={style.prod}>
                        <Link href='/product'>Product</Link>
                        <Link href='/addProduct'>Add product</Link>
                    </div>
                        <Link href='/' onClick={() => localStorage.setItem('token', '')}>Sign out</Link>
                </div>
            </div>
        </>
    );  
};

export default TheHeader;