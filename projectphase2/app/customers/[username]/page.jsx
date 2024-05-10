import React from 'react';
import styles from "@/app/page.module.css";
import ecomRepo from '@/app/repo/ecomRepo';
// import purchaseHistoryData from '@/app/data/purchasehistory.json';
// import userData from '@/app/data/users.json';
export default async function page({params}) {
  console.log(params)

  const purchase = await ecomRepo.getCustomerHistoryByName(params.username)
  const money = purchase.userPurchases.map(p =>p.price)
  const totalAmount= money.reduce((accumaltor , currentValue)=>accumaltor+currentValue,0);
  return (
    <div>

    <h1 className={styles.h1}>Customer Statistics</h1>
    <table className={styles.table}>
      <tbody>
        <tr>
          <td className={styles.td}>Total Orders</td>
          <td className={styles.td}>{purchase.userPurchases.length}</td>
        </tr>

        <tr>
          <td className={styles.td}>Total Amount Paid</td>
          <td className={styles.td}>{totalAmount}</td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}
