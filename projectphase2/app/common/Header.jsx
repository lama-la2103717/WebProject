import React from 'react'
import styles from "@/app/page.module.css"
import Link from 'next/link'
export default function Header() {
  
  return (
    <div> 
    <header className={styles.header}>
 
    <div >
    <input type="search" placeholder="Search here ..." className={styles.searchInput}/>
    </div>

    <input type="checkbox" id={styles.checkbox} />

    <div id={styles.mainNav}>
      <nav className={styles.mainNav}>
                <ul>
                    <li><a href="login.html" class="login">Login</a></li>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#brands">Brands</a></li>
                    <li><a href="#topRating">Top Rated</a></li>
                </ul>
      </nav>
    </div>




    </header>
    </div>
  )
}
