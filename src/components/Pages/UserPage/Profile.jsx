import { useState, useEffect } from 'react'
import cn from 'classnames'
import stl from './styles.profile.module.scss'
import { apiValidateToken } from '../../Api/apiAuth'

export function Profile() {
  const [profile, setProfile] = useState([])
  const myToken = JSON.parse(localStorage.getItem('token'))
  useEffect(() => {
    apiValidateToken.validateToken(myToken).then((usr) => setProfile(usr))
  }, [])
  return (
    <div className={cn(stl.profile)}>
      <div className={cn(stl.profile__img)}>
        <img
          src={profile.avatar}
          alt='Аватар'
        />
      </div>
      <div className={cn(stl.profile__info)}>
        <div className={cn(stl.profile__name)}>
          Имя Фамилия:
          <span>{profile.name}</span>
        </div>
        <div className={cn(stl.profile__email)}>
          Электронная почта:
          <span>{profile.email}</span>
        </div>
        <div className={cn(stl.profile__group)}>
          Номер группы:
          <span>{profile.group}</span>
        </div>
        <div className={cn(stl.profile__about)}>
          Информация обо мне:
          <span>{profile.about}</span>
        </div>
      </div>
    </div>
  )
}
