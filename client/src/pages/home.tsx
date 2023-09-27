/** @format */

import { useState, useEffect } from 'react'
import Header from '../components/header/header'
import { getAllProducts } from '../api/products-api'
import ProductCard from '../components/product-card/product-card'

const Home = () => {
	const [products, setProducts] = useState([])
	const [productsLoad, setProductsLoad] = useState(false)

	useEffect(() => {
		fetchAllProducts()
	}, [])

	const fetchAllProducts = async () => {
		setProductsLoad(true)
		let data = await getAllProducts()
		if (data.status === 200) {
			setProducts(data.data.data)
		} else {
			console.log(data)
		}
		setProductsLoad(false)
	}

	let productHtml = ''
	if (productsLoad) {
		productHtml = `<div className='spinner-border'></div>`
	} else if (products[0]) {
		productHtml = products
			.map((value: any, index) => <ProductCard key={'product' + index} {...value} />)
			.join('')
	}

	return (
		<>
			<Header />
			{productHtml}
		</>
	)
}

export default Home
