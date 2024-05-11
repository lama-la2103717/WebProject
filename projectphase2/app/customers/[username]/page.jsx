import React from 'react';
import styles from "@/app/page.module.css";
import ecomRepo from '@/app/repo/ecomRepo';

export default async function page({ params }) {
  console.log(params);
  const purchase = await ecomRepo.getCustomerHistoryByName(params.username);
  const money = purchase.userPurchases.map(p => p.price);
  const totalAmount = money.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const brandCounts = purchase.userPurchases.reduce((counts, purchase) => {
    counts[purchase.brandName] = (counts[purchase.brandName] || 0) + 1;
    return counts;
  }, {});

  let mostOrderedBrand = "";
  let maxOrders = 0;
  for (const brand in brandCounts) {
    if (brandCounts[brand] > maxOrders) {
      mostOrderedBrand = brand;
      maxOrders = brandCounts[brand];
    }
  }

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
          <tr>
            <td className={styles.td}>Most Ordered Brand</td>
            <td className={styles.td}>{mostOrderedBrand}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
