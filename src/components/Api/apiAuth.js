class ApiAuth {
  constructor(url) {
    this.url = url
  }

  async singUp({ group, email, password }) {
    try {
      const res = await fetch(`${this.url}`, {
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

      if (res.status !== 200) {
        throw Error()
      }
    } catch (err) {
      throw Error(err)
    }
  }

  async singIn({ email, password }) {
    try {
      const res = await fetch(`${this.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${email}`,
          password: `${password}`,
        }),
      })
      if (res.status === 200) {
        const token = await res.json()
        console.log({ token })
        localStorage.setItem('token', JSON.stringify(token.token))
      }

      if (res.status !== 200) {
        throw Error()
      }
    } catch (err) {
      throw Error(err)
    }
  }

  async getToken(JWT) {
    try {
      const res = await fetch(`${this.url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${JWT}`,
        },
      })

      if (res.status !== 200) {
        throw Error()
      }
    } catch (err) {
      throw Error(err)
    }
  }

  async validateToken(token) {
    try {
      const res = await fetch(`${this.url}`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      })
      return res.json()
    } catch (err) {
      throw Error(err)
    }
  }
}

export const apiAuth = new ApiAuth('https://api.react-learning.ru/signup')
export const apiAuthSingIn = new ApiAuth('https://api.react-learning.ru/signin')
export const apiValidateToken = new ApiAuth('https://api.react-learning.ru/v2/sm8/users/me')
export const apiToken = new ApiAuth('https://api.react-learning.ru/v2/sm8/users/me')

console.log({ apiAuth })
