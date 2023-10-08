"use client";
import Card from '@/components/Card/Card';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from '@/components/Modal/Modal';
import style from './page.module.css';
import TheHeader from '@/components/TheHeader/TheHeader';
import { Token } from '@/context/context';
import { useRouter } from "next/navigation";

const page = () => {
    const {token} = React.useContext(Token);
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    })

    const [status, setStatus] = useState(false);
    const [des, setDes] = useState('');
    const [err, setErr] = useState('');
    const [productAdd, setProductAdd] = useState({
        title: '', 
        price: 0,
        description: '',
        image: '',
        category: '' 
    });



    const addProduct = () => {
        if (productAdd.title === '' || productAdd.price <= 0 || productAdd.description === '' || productAdd.image === '' || productAdd.category === '') {
            setErr('not all fields are filled in')

        } else {
                axios({
                url:"https://fakestoreapi.com/products",
                method:"POST",
                data: productAdd,
            }).then(() => {
                setDes('Product added successfully')
                setStatus(true);
            })
            .catch((err) => {
                setDes(err.message);
                setStatus(true);
            })
            .finally(() => {
                setErr('')
                setProductAdd({
                    title: '', 
                    price: 0,
                    description: '',
                    image: '',
                    category: '' 
                })
            });
        }

        
    };


    return (
<>
<TheHeader/>
        <div className={style.wrapper}>
            <div>Add product</div>
            <div>{err}</div>
            <Card  prop={productAdd} setProp={setProductAdd} setApi={addProduct}/>
            <div>{status ? 
                    <Modal visible={status} setVisible={setStatus}>
                        <div className={style.des}>
                            <div>{des}</div>
                            <button className={style.btn} onClick={() => setStatus(false)}>Close</button>
                        </div>
                    </Modal> 
                : null}
            </div>
        </div>
</>


    );
};

export default page;