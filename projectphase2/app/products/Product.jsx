import React from 'react'
import styles from "@/app/page.module.css"
export default function Product({product}) {
  return (
    <div className={ styles.card}>
        <div className={styles.productInfo}>
        <img src={product.image} alt="" />
        <h3 className={styles.productTitle}>{product.title}</h3>
        <p className={styles.productPrice}>{product.price}</p>
        {product.stock!==0?
            <button type="button" id={styles.button} className={styles.purchase} data-title={product.title}> Purchase</button>:
            <label > Out of Stock</label>
        }

        </div>

    </div>
  )
}
