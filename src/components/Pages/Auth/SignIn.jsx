import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './styles.singUpIn.module.scss'
import { authorizationRequest } from '../../Api/apiAuth'

const signInUser = ({ email, password }) => authorizationRequest.signIn({ email, password })

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      navigate('/')
    },
  })
  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync({ email, password })
  }

  return (
    <form
      onSubmit={handlerSubmit}
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
