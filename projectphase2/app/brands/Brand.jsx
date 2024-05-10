'use client'
import React from 'react'
import styles from '@/app/page.module.css'
import Link from 'next/link'

export default function Brand({brand}) {
  return (
    <div className={styles.card}>
        <img src={brand.image} alt=" " />
        <p>{brand.title}</p>
    <input type="button" value="SHOP NOW" id={styles.button}/>

    </div>
  )
}
