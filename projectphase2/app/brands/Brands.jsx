'use client'
import { React, useState } from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link'
import Brand from "@/app/brands/Brand"
export default function Brands({initialBrands}){
    const [brands, setBrands]= useState(initialBrands)

    return(
        <section className={styles.brands}>
            <h2>Brands</h2>
            <div className={styles.brand}>
                {
                    brands.map(brand=> <Brand brand = {brand}></Brand>

                    )
                }             

            </div>


        
        </section>
    )
}

// <section id="brands" class="brands">

// <h2>Brands</h2>
// <div class="brand">
//     <div class="card">
//         <img src="/images/BeautyOfJoseon.webp" alt="BeautyOfJoseon" >
//         <p>Beauty of Joseon</p>
//         <input type="button" value="SHOP NOW" id="button">
//     </div>
//     <div class="card">
//         <img src="/images/Cosrx.webp" alt="">
//         <p>CosRx</p>
//         <input type="button" value="SHOP NOW" id="button">
//     </div>
//     <div class="card">
//         <img src="/images/idewcare.avif" alt="">
//         <p>I Dew Care</p>
//         <input type="button" value="SHOP NOW" id="button">
//     </div>
    
//     <div class="card">
//         <img src="/images/isnlogo.png" alt="">
//         <p>ISNtree</p>
//         <input type="button" value="SHOP NOW" id="button">
//     </div>
    
//     <div class="card">
//         <img src="/images/mizon.png" alt="">
//         <p>Mizon</p>
//         <input type="button" value="SHOP NOW" id="button">
//     </div>
//     <div class="card">
//         <img src="/images/someByMe.png" alt="">
//         <p>SOME BY MI</p>
//         <input type="button" value="SHOP NOW" id="button">
//     </div>
// </div>

// </section>