export const ACTION_KEY_LOGIN = 'login'
export const ACTION_KEY_SIGNUP = 'signup'

export const state = () => ({
  user: null
})

export const getters = {
  user: (state) => state.user
}

export const mutations = {
  SET_USER(state, user) {
	state.user = user
  }
}

export const actions = {
  async init({ commit }) {

	this.$netlifyIdentity.on('init', async (user) => {

	  if (user) {



			// check in google sheets to what locations this user has access to


			const resultSheet = await fetch('/.netlify/functions/get-sheet', {
				method: 'POST',
				body: JSON.stringify({ sheet: 'users' }),
			})
			const res = await resultSheet.json()

			// find in the array "res" the user based on the email of the current user

			const userInSheet = res.filter((u) => u.email === user.email)


			if (userInSheet.length > 0) {


				// const locations = this.$store.getters.localisedLocations
				// if the user is in the sheet, add the roles to the user
				commit('SET_USER', {
					username: user.user_metadata.full_name,
					email: user.email,
					roles: userInSheet[0].role,
					locations: userInSheet[0].locations.split(', ')
				})
			} else {
				commit('SET_USER', {
					username: user.user_metadata.full_name,
					email: user.email,
					roles: user.app_metadata.roles
				})
			}



	  }
	})
	this.$netlifyIdentity.on('close', () => {
	  const user = this.$netlifyIdentity.currentUser()
	  if (user) {
		commit('SET_USER', {
		  username: user.user_metadata.full_name,
		  email: user.email,
			roles: user.app_metadata.roles
		})
	  }
	})
	this.$netlifyIdentity.init({
	  APIUrl: process.env.NETLIFY_IDENTITY_ENDPOINT_URL
	})
  },
  openSignup({ dispatch }) {
	dispatch('open', ACTION_KEY_SIGNUP)
  },
  openLogin({ dispatch }) {
	dispatch('open', ACTION_KEY_LOGIN)
  },
  logout({ commit }) {
	this.$netlifyIdentity.logout()
	commit('SET_USER', null)
  },
  async open({ commit }, action) {
	  console.log('open', action)
	this.$netlifyIdentity.open(action)
		this.$netlifyIdentity.on(action, async (user) => {





			// THIS IS THE SAME CODE AS IN INIT
			// check in google sheets to what locations this user has access to
			const resultSheet = await fetch('/.netlify/functions/get-sheet', {
				method: 'POST',
				body: JSON.stringify({ sheet: 'users' }),
			})
			const res = await resultSheet.json()
			// find in the array "res" the user based on the email of the current user
			const userInSheet = res.filter((u) => u.email === user.email)

			if (userInSheet.length > 0) {

				// const locations = this.$store.getters.localisedLocations
				// if the user is in the sheet, add the roles to the user
				commit('SET_USER', {
					username: user.user_metadata.full_name,
					email: user.email,
					roles: userInSheet[0].role,
					locations: userInSheet[0].locations.split(', ')
				})
			}



		//
		// 	commit('SET_USER', {
		// username: user.user_metadata.full_name,
		// email: user.email,
		// 	roles: user.app_metadata.roles
	  // })






	  this.$netlifyIdentity.close()
	})
	}
}