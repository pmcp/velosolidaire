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
		console.log('init', user)

	  if (user) {

		commit('SET_USER', {
		  username: user.user_metadata.full_name,
		  email: user.email,
			roles: user.app_metadata.roles
		})




		  // check in google sheets to what locations this user has access to
		  const resultSheet = await fetch('/.netlify/functions/get-sheet', {
			  method: 'POST',
			  body: JSON.stringify({ sheet: 'users' }),
		  })
		  const res = await resultSheet.json()
		  console.log('here', res)
		  // find in the array "res" the user based on the email of the current user
		  console.log('user', user.email)
		  const userInSheet = res.filter((u) => u.email === user.email)
		  console.log('userInSheet', userInSheet)

		  if (userInSheet.length > 0) {

			  // const locations = this.$store.getters.localisedLocations
			  // if the user is in the sheet, add the roles to the user
			  commit('SET_USER', {
				  username: user.user_metadata.full_name,
				  email: user.email,
				  roles: userInSheet[0].role,
				  locations: userInSheet[0].locations.split(',')
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
  open({ commit }, action) {
	this.$netlifyIdentity.open(action)
		this.$netlifyIdentity.on(action, (user) => {
	  commit('SET_USER', {
		username: user.user_metadata.full_name,
		email: user.email,
			roles: user.app_metadata.roles
	  })
	  this.$netlifyIdentity.close()
	})
	}
}