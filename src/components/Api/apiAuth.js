const BASE_URL_AUTH = 'https://api.react-learning.ru/'
const BASE_URL_USER = 'https://api.react-learning.ru/v2/'

class ApiAuth {
  constructor(url) {
    this.url = url
  }

  async signUp({ group, email, password }) {
    try {
      const res = await fetch(`${this.url}signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          group: `${group}`,
          email: `${email}`,
          password: `${password}`,
        }),
      })

      if (res.status !== 201) {
        throw Error()
      }
    } catch (err) {
      throw Error(err)
    }
  }

  async signIn({ email, password }) {
    try {
      const res = await fetch(`${this.url}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      })
      if (res.status === 401) {
        alert('Неправильные почта или пароль')
      }
      if (res.status === 200) {
        const resp = await res.json()
        localStorage.setItem('token', JSON.stringify(resp.token))
        localStorage.setItem('groupId', JSON.stringify(resp.data.group))
        localStorage.setItem('userId', JSON.stringify(resp.data._id))
      }

      if (res.status !== 200) {
        throw Error()
      }
    } catch (err) {
      throw Error(err)
    }
  }

  async getUserByToken() {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const groupId = JSON.parse(localStorage.getItem('groupId'))
    const res = await fetch(`${this.url}${groupId}/users/me`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${JWT}`,
      },
    })

    return res.json()
  }
}

export const authorizationRequest = new ApiAuth(BASE_URL_AUTH)
export const userRequest = new ApiAuth(BASE_URL_USER)
