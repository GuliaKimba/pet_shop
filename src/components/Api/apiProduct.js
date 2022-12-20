const URL_ALL_PRODUCTS = 'https://api.react-learning.ru/products'

class ApiProducts {
  constructor(url) {
    this.url = url
  }

  async getAllProducts() {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}`, {
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  async addLikeProducts({ productId }) {
    const res = await fetch(`${this.url}/likes:${productId}`, {
      method: 'PUT',
    })
    return res.json()
  }
}
export const apiAllProducts = new ApiProducts(URL_ALL_PRODUCTS)
