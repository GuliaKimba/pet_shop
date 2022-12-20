import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import cn from 'classnames'
import stl from './styles.profile.module.scss'
import { userRequest } from '../../Api/apiAuth'

const getUserPage = () => userRequest.getUserByToken()

export function Profile() {
  const {
    data: response,
    isLoading,
    isError,
    error,
  } = useQuery({ queryKey: ['UserProfile'], queryFn: getUserPage })

  const navigate = useNavigate()

  if (isLoading) return <div>Загрузка</div>

  if (!response) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (response.err) return navigate('*')

  return (
    <div className={cn(stl.profile)}>
      <div className={cn(stl.profile__img)}>
        <img
          src={response.avatar}
          alt='Аватар'
        />
      </div>
      <div className={cn(stl.profile__info)}>
        <div className={cn(stl.profile__name)}>
          Имя Фамилия:
          <span>{response.name}</span>
        </div>
        <div className={cn(stl.profile__email)}>
          Электронная почта:
          <span>{response.email}</span>
        </div>
        <div className={cn(stl.profile__group)}>
          Номер группы:
          <span>{response.group}</span>
        </div>
        <div className={cn(stl.profile__about)}>
          Информация обо мне:
          <span>{response.about}</span>
        </div>
      </div>
    </div>
  )
}
