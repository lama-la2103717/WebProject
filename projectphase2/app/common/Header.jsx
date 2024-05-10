import React from 'react'
import styles from "@/app/page.module.css"

export default function Header() {
  return (
    <header class="header hiddenHdr">
 
    <div>
    <img src="/images/logo.png" className={styles.logoImg} alt="Logo" />
    </div>
 
    <div >
    <input type="search" placeholder="Search here ..." className={styles.searchInput}/>
    </div>
 
    <input type="checkbox" id={styles.checkbox}/>
 
    <div id="mainNav">
        <nav class="mainNav">
        <ul class="mainNavUl">
        <li><a href="login.html" class="login">Login</a></li>
        <li><a href="#home">Home</a></li>
        <li><a href="#brands">Brands</a></li>
        <li><a href="#topRating">Top Rated</a></li>
        </ul>
        </nav>
    </div>
    <label for="checkbox">
        <i class="fa fa-bars menu-icon"></i>
    </label>
    </header>
  )
}
