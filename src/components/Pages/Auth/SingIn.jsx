import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.singUpIn.module.scss'
import { apiAuthSingIn } from '../../Api/apiAuth'

export function SingIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await apiAuthSingIn.singIn({ email, password })

    return navigate('/')
  }

  console.log({ email })

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(stl.form)}>
      <div>
        <p>Электронная почта</p>

        <input
          className={cn(stl.input__singin, stl.input__email)}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          id='singin_email'
        />
      </div>

      <div>
        <p>Пароль</p>
        <input
          className={cn(stl.input__singin, stl.input__password)}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          id='singin_password'
        />
      </div>

      <button
        className={cn(stl.sing__btn)}
        type='submit'>
        Войти 
      </button>
    </form>
  )
}
