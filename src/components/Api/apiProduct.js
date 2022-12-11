class ApiProducts {
  constructor(url) {
    this.url = url
  }

  async getAllProducts() {
    try {
      const res = await fetch(`${this.url}`, {
        headers: {
          authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2Mzg5ZjRmZDU5Yjk4YjAzOGY3NzlkNmIiLCJncm91cCI6InNtOCIsImlhdCI6MTY3MDMzNTU0NSwiZXhwIjoxNzAxODcxNTQ1fQ.Sx6X4XiE_haLZ2G2SkJ9vSSnBRxpcNu4JpkXhYDWxps',
        },
      })
      return res.json()
    } catch (err) {
      throw Error(err)
    }
  }
}
export const api = new ApiProducts('https://api.react-learning.ru/products')
