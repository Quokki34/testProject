"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import style from './page.module.css';
import Link from "next/link";
import TheHeader from "@/components/TheHeader/TheHeader";
import { useRouter } from "next/navigation";
import { Token } from "@/context/context";
import Loader from "@/components/Loader/Loader";



const Product = () => {
    const {token} = React.useContext(Token);
    const router = useRouter();
    useEffect(() => {
        if (!token) {
            router.push('/')
        }
    })

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [err, setError] = useState('');


    useEffect(() => {
        setLoading(true)
        axios({
            method:'GET',
            url:'https://fakestoreapi.com/products'
        }).then(res => {
            setData(res.data)
        })
        .catch(e => setError(e.message))
        .finally(() => setLoading(false))
    }, []);

    return (<>
    <TheHeader/>
    {loading ? 
    <Loader/> : 
        <div className={style.wrapper}>
            {err ?                       
            <div>{err}</div>
             :
            <div className={style.allProd}>
                {data.map(product => (
                    <Link  key={product.id} href={`/product/${product.id}`}>
                        <div key={product.id} className={style.container}>
                            <div className={style.wrapImg}><img src={product.image} alt='#' /></div>
                            <div className={style.des}>
                                <div>{product.title}</div>
                                <div>{product.price}$</div>
                            </div>
                        </div>
                    </Link> 
                ))}
            </div>

        }
        </div>
    }

    </>
    );
};

export default Product;