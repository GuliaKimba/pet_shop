import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: 'user',
	initialState: {
		user: false
	},
	reducers: {
		singInUser(state, action) {
			const getTokenUserLS = JSON.parse(localStorage.getItem('token'))
			i
		}
	}
})