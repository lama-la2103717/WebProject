'use client'
import React from 'react'
import styles from "@/app/page.module.css"
import Link from 'next/link'

export default function Product({products}) {
    return (
        
            <div className={styles.productCards}>
            {
                products.map(product =>
                    <div className={styles.productCards} key={product.id}>
                        <p>Name :  {product.title}</p>
                        <p>Price :  {product.price}</p>
                        <button > Purchase </button>
                    </div>
                )
            }
        </div> 
     
    )
  }
  