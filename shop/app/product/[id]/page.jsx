"use client";
import axios from "axios";
import React, {useEffect, useState} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import style from './page.module.css'
import Modal from "@/components/Modal/Modal";
import TheHeader from "@/components/TheHeader/TheHeader";
import { Token } from "@/context/context";
import Update from "@/components/Update/Update";
import Loader from "@/components/Loader/Loader";

export default function page() {
    const {token} = React.useContext(Token);
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    })
    const pathname = usePathname();
    const id = pathname.split('/').at(-1);
    const [product, setProduct] = useState({});
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const [err ,setErr] = useState('');
    useEffect(() => {
        setLoading(true)
        axios({
               method:'GET',
               url:`https://fakestoreapi.com/products/${id}`
           }).then(res => {
               setProduct(res.data)
           })
           .catch(e => {
                setModal(true);
                setStatus(e.message);
                setTimeout(() => router.push(`/product`), 2000);
           })
           .finally(() => setLoading(false))
       }, []);

       const Delete = () => {
        axios({
            url:`https://fakestoreapi.com/products/${id}`,
            method:"DELETE",
        }).then(() => {
            setModal(true);
            setStatus('The product has been removed');
            setTimeout(() => router.push(`/product`), 2000);
        })
        .catch((err) => {
            setStatus(err.response.data);
            setTimeout(() => router.push(`/product`), 2000);
        });
    };
    
    const update = () => {
        if (product.title === '' || product.price <= 0 || product.description === '' || product.image === '' || product.category === '') {
            setErr('not all fields are filled in')

        } else {
                axios({
                    url:`https://fakestoreapi.com/products/${id}`,
                    method:"PUT",
                    body: product,
                }).then(() => {
                    setErr('');
                    setStatus('The product has been successfully updated');
                    setTimeout(() => router.push(`/product`), 2000);
                })
                .catch((err) => {
                    setStatus(err.response.data);
                    setTimeout(() => router.push(`/product`), 2000);
                });
        }

    };
    
    

    return (
        <div className={style.wrap}>
            <TheHeader/>
            {loading ? 
                <Loader/>
            :
                <div key={product.id}  className={style.container}>
                    <div className={style.card}>
                        <img src={product.image} alt='#'/>
                        <div className={style.des}>
                            <div className={style.title}>{product.title}</div>
                            <div className={style.category}><p>category:</p> {product.category}</div>
                            <div className={style.price}>{product.price}$</div>
                            <div className={style.line}></div>
                            <div className={style.description}>{product.description}</div>

                            <div className={style.btns}>
                                <button onClick={() => setModal(true)}>update</button>
                                <button onClick={Delete}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
            

            <div>
                {modal ? 
                    <Modal visible={modal} setVisible={setModal}>
                        {status ? 
                            (<div>{status}</div>)
                            :
                            <div>
                                 <Update update={update} product={product} setProduct={setProduct} setModal={setModal} err={err}/>
                            </div>
                           
                        }
                    
                    </Modal> 
                : null }
            </div>

        </div>
    );
};

