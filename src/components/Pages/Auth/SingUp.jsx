import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import cn from 'classnames'
import stl from './styles.singUpIn.module.scss'
import { apiAuth } from '../../Api/apiAuth'

export function SingUp() {
  const [group, setGroup] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    apiAuth.singUp({ group, email, password })
    return navigate('/singin')
  }

  return (
    <form
      onSubmit={handleSubmit}
      name='singup_form'
      className={cn(stl.form)}>
      <div>
        <p>Ваша группа</p>
        <input
          className={cn(stl.input__singup, stl.input__text)}
          onChange={(e) => setGroup(e.target.value)}
          value={group}
          type='text'
          id='singup_group'
        />
      </div>

      <div>
        <p>Электронная почта</p>

        <input
          className={cn(stl.input__singup, stl.input__email)}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          id='singup_email'
        />
      </div>

      <div>
        <p>Пароль</p>
        <input
          className={cn(stl.input__singup, stl.input__password)}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type='password'
          id='singup_password'
        />
      </div>

      <button
        className={cn(stl.sing__btn)}
        type='submit'>
        Зарегистрироваться
      </button>
    </form>
  )
}
