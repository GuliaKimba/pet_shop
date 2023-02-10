import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import stl from './editNameFormStyles.module.scss'
import { userRequest } from '../Api/apiAuth'

export function EditNameForm() {
  const navigate = useNavigate()
  const editProfile = (values) => userRequest.editName(values)
  const userName = JSON.parse(localStorage.getItem('userName'))
  const userAbout = JSON.parse(localStorage.getItem('userAbout'))

  const { mutateAsync } = useMutation({
    mutationFn: editProfile,
  })
  const handlerSubmit = async (values) => {
    await mutateAsync(values)
    navigate('/profile')
  }
  const handlerCancel = () => {
    navigate('/profile')
  }
  return (
    <div className={cn(stl.new__product)}>
      <div className={cn(stl.container)}>
        <div className={cn(stl.formik)}>
          <h2>Редактировать</h2>
          <Formik
            initialValues={{
              name: userName,
              about: userAbout,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(3, 'Минимум 3 символа')
                .max(30, 'Максимум 30 символов')
                .required('Обязательно для заполнения'),

              about: Yup.string()
                .min(5, 'Минимум 5 символов')
                .max(100, 'Максимум 100 символов')
                .required('Обязательно для заполнения'),
            })}
            onSubmit={(values) => {
              handlerSubmit(values)
            }}>
            <Form className={cn(stl.form)}>
              <label htmlFor='name'>Фамилия Имя</label>
              <Field
                className={cn(stl.field)}
                name='name'
                type='text'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='name'
              />

              <label htmlFor='about'>Информация обо мне</label>
              <Field
                className={cn(stl.field)}
                name='about'
                as='textarea'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='about'
              />

              <button
                className={cn(stl.formik__btn)}
                type='submit'>
                Сохранить
              </button>
              <button
                onClick={handlerCancel}
                className={cn(stl.formik__btn, stl.formik__btn_cancel)}
                type='button'>
                Отмена
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
