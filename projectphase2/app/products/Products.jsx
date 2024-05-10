'use client'
import { React, useState } from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link'
import Product from "@/app/products/Product"
export default function Products({initialProducts}){
    const [products, setProduct]= useState(initialProducts)

    return(
        <section className={styles.brands}>
            <h2>Top Rated</h2>
            <div className={styles.product}>
                {
                    products.map(product=> <Product product = {product}></Product>

                    )
                }             

            </div>


        
        </section>
    )
}