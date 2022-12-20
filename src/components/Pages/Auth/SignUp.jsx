import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import cn from 'classnames'
import stl from './styles.singUpIn.module.scss'
import { registrationRequest } from '../../Api/apiAuth'

const signUpUser = ({ group, email, password }) =>
  registrationRequest.signUp({ group, email, password })

export function SignUp() {
  const [group, setGroup] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [groupEmpty, setGroupEmpty] = useState(false)
  const [emailEmpty, setEmailEmpty] = useState(false)
  const [passwordEmpty, setPasswordEmpty] = useState(false)
  const [groupError, setGroupError] = useState('Поле группа не может быть пустым')
  const [emailError, setEmailError] = useState('Поле Email не может быть пустым')
  const [passwordError, setPasswordError] = useState('Поле Пароль не может быть пустым')
  const [isFormVal, setIsFormVal] = useState(false)
  const navigate = useNavigate()

  const { mutateAsync } = useMutation({
    mutationFn: signUpUser,
    onSuccess: () => {
      navigate('/signin')
    },
  })
  useEffect(() => {
    if (groupError || emailError || passwordError) {
      setIsFormVal(false)
    } else {
      setIsFormVal(true)
    }
  }, [groupError, emailError, passwordError])

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'group':
        setGroupEmpty(true)
        break
      case 'email':
        setEmailEmpty(true)
        break
      case 'password':
        setPasswordEmpty(true)
        break
      default:
    }
  }

  const groupHendler = (e) => {
    setGroup(e.target.value)
    if (e.target.value.length < 3 || e.target.value.length > 10) {
      setGroupError('Название группы должно быть длинее 2 и меньше 10 символов')
      if (!e.target.value) {
        setGroupError('Название группы должно быть длинее 2 и меньше 10 символов')
      }
    } else {
      setGroupError('')
    }
  }

  const emailHandler = (e) => {
    setEmail(e.target.value)
    const re = /\S+@\S+\.\S+/
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError('некорректный адрес')
    } else {
      setEmailError('')
    }
  }

  const passwordHendler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 5 || e.target.value.length > 10) {
      setPasswordError('Пароль должен быть длинее 5 и меньше 10 символов')
      if (!e.target.value) {
        setPasswordError('Пароль должен быть длинее 5 и меньше 10 символов')
      }
    } else {
      setPasswordError('')
    }
  }

  const hendlerSubmit = async (e) => {
    e.preventDefault()
    await mutateAsync({ group, email, password })
  }

  return (
    <form
      onSubmit={hendlerSubmit}
      name='singup_form'
      className={cn(stl.form)}>
      <div className={cn(stl.input__cnt)}>
        <p>Ваша группа</p>
        {groupEmpty && groupError && <div style={{ color: 'red' }}>{groupError}</div>}
        <input
          className={cn(stl.input__singup, stl.input__text)}
          onChange={(e) => groupHendler(e)}
          onBlur={(e) => blurHandler(e)}
          value={group}
          type='text'
          id='singup_group'
          name='group'
        />
      </div>

      <div className={cn(stl.input__cnt)}>
        <p>Электронная почта</p>
        {emailEmpty && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
        <input
          className={cn(stl.input__singup, stl.input__email)}
          onChange={(e) => emailHandler(e)}
          onBlur={(e) => blurHandler(e)}
          value={email}
          type='email'
          id='singup_email'
          name='email'
        />
      </div>

      <div className={cn(stl.input__cnt)}>
        <p>Пароль</p>
        {passwordEmpty && passwordError && <div style={{ color: 'red' }}>{passwordError}</div>}
        <input
          className={cn(stl.input__singup, stl.input__password)}
          onChange={(e) => passwordHendler(e)}
          onBlur={(e) => blurHandler(e)}
          value={password}
          type='password'
          id='singup_password'
          name='password'
        />
      </div>

      <button
        className={cn(stl.sing__btn)}
        disabled={!isFormVal}
        type='submit'>
        Зарегистрироваться
      </button>
    </form>
  )
}
