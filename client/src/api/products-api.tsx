/** @format */
import axios from 'axios'

export const axiosProducts = axios.create({
	baseURL: 'http://localhost:4000',
})

export const getAllProducts = () => {
	return axiosProducts('/all-products')
}
