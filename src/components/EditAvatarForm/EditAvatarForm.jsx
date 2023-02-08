import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import stl from './editAvatarFormStyles.module.scss'
import { userRequest } from '../Api/apiAuth'

export function EditAvatarForm() {
  const navigate = useNavigate()
  const editAvatar = (values) => userRequest.editAvatar(values)
  // const pictures = JSON.parse(localStorage.getItem('pictures'))

  const { mutateAsync } = useMutation({
    mutationFn: editAvatar,
  })
  const handlerSubmit = async (values) => {
    console.log({ values })
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
              avatar: '',
            }}
            validationSchema={Yup.object({
              avatar: Yup.string().required('Обязательно для заполнения'),
            })}
            onSubmit={(values) => {
              console.log({ values })
              handlerSubmit(values)
            }}>
            <Form className={cn(stl.form)}>
              <label htmlFor='avatar'>Изображение</label>
              <Field
                className={cn(stl.field)}
                name='avatar'
                type='text'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='avatar'
              />
              <button
                className={cn(stl.formik__btn)}
                type='submit'>
                Сохранить
              </button>
              <button
                onClick={handlerCancel}
                className={cn(stl.formik__btn)}
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
