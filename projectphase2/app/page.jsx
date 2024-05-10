import Image from "next/image";
import styles from "./page.module.css";
import ecommRepo from "@/app/repo/ecommRepo";
import Brands from '@/app/brands/Brands'
import Products from '@/app/products/Products'

export default async function Home() {
  const brands = await ecommRepo.getBrands()
  const products = await ecommRepo.getTopProducts()
  return (
    <>
    <Brands initialBrands = {brands}></Brands>
    <br />
    <Products initialProducts = {products}></Products>
    
    
    </>
  );
}
