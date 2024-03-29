const URL_ALL_PRODUCTS = 'https://api.react-learning.ru/products/'

class ApiProducts {
  constructor(url) {
    this.url = url
  }

  async getAllProducts(filters) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}?${new URLSearchParams(filters).toString()}`, {
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  async getProductsById(ids) {
    const JWT = JSON.parse(localStorage.getItem('token'))

    return Promise.all(
      ids.map((id) =>
        fetch(`${this.url}${id}`, {
          headers: {
            authorization: `Bearer ${JWT}`,
          },
        })),
    )
      .then((response) => response)
      .then((res) => Promise.all(res.map((r) => r.json())))
      .then((prod) => prod)
  }

  async getCurrentProductById(id) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}${id}`, {
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  async addLikeProducts(productId) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}likes/${productId}`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  async deleteLikeProducts(productId) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}likes/${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  async deleteMyProduct(productId) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}${productId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }

  async addNewProduct(values) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify(values),
    })
    return res.json()
  }

  async getAllReview(productID) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`${this.url}review/${productID}`, {
      headers: {
        authorization: `Bearer ${JWT}`,
      },
    })
    return res.json()
  }
}

export const apiAllProducts = new ApiProducts(URL_ALL_PRODUCTS)
