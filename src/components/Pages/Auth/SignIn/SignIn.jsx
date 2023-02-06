import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './signInStyles.module.scss'
import { authorizationRequest } from '../../../Api/apiAuth'
import { Logo } from '../../../Logo/Logo'

const signInUser = ({ email, password }) => authorizationRequest.signIn({ email, password })

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailEmpty, setEmailEmpty] = useState(false)
  const [passwordEmpty, setPasswordEmpty] = useState(false)
  const [emailError, setEmailError] = useState('Поле Почта не может быть пустым')
  const [passwordError, setPasswordError] = useState('Поле Пароль не может быть пустым')
  const [isFormValid, setIsFormValid] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (emailError || passwordError) {
      setIsFormValid(false)
    } else {
      setIsFormValid(true)
    }
  }, [emailError, passwordError])

  const { mutateAsync } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      navigate('/')
    },
  })
  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailEmpty(true)
        break
      case 'password':
        setPasswordEmpty(true)
        break
      default:
    }
  }
  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /\S+@\S+\.\S+/
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('Некорректный адрес')
      if (!e.target.value) {
        setEmailError('Поле Почта не может быть пустым')
      }
    } else {
      setEmailError('')
    }
  }

  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 10) {
      setPasswordError('Длина пароля от 5 до 10 символов')
      if (!e.target.value) {
        setPasswordError('Длина пароля от 5 до 10 символов')
      }
    } else {
      setPasswordError('')
    }
  }

  const handlerSignUp = () => {
    navigate('/signup')
  }

  const handlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync({ email, password })
  }

  return (
    <div className={cn(stl.container)}>
      <Logo />
      <form
        onSubmit={handlerSubmit}
        className={cn(stl.form)}>
        <div>
          <p>Электронная почта</p>
          {emailEmpty && emailError && (
            <div style={{ color: 'red', fontSize: '13px', paddingBottom: '7px' }}>{emailError}</div>
          )}
          <input
            className={cn(stl.input__singin, stl.input__email)}
            value={email}
            type='email'
            name='email'
            onChange={emailHandler}
            onBlur={blurHandler}
            id='singin_email'
          />
        </div>

        <div>
          <p>Пароль</p>
          {passwordEmpty && passwordError && (
            <div style={{ color: 'red', fontSize: '13px', paddingBottom: '7px' }}>
              {passwordError}
            </div>
          )}
          <input
            className={cn(stl.input__singin, stl.input__password)}
            value={password}
            type='password'
            name='password'
            onChange={passwordHandler}
            onBlur={blurHandler}
            id='singin_password'
          />
        </div>
        <div onClick={handlerSignUp} className={cn(stl.navigate)}>Зарегистрироваться</div>
        <button
          className={cn(stl.sing__btn, !isFormValid ? stl.noactive : '')}
          disabled={!isFormValid}
          type='submit'>
          Войти
        </button>
      </form>
    </div>
  )
}
