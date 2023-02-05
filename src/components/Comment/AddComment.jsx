import { useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import stl from './addCommentStyles.scss'
// import { apiAllProducts } from '../Api/apiProduct'

export function AddComment() {
  const params = useParams()
  const idProd = params._id
  console.log({ idProd })
  async function addNewReview(values) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`https://api.react-learning.ru/products/review/${idProd}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify(values),
    })
    return res.json()
  }
  // const addNewReviewFetch = (values) => apiAllProducts.addNewReview(values)

  const { mutateAsync } = useMutation({
    mutationFn: addNewReview,
    onSuccess: () => {
      console.log('OK')
    },
  })
  console.log({ mutateAsync })
  const handlerSubmit = async (values) => {
    await mutateAsync(values)
  }
  return (
    <div className={cn(stl.formik)}>
      <Formik
        initialValues={{
          text: '',
          rating: '',
        }}
        validationSchema={Yup.object({
          text: Yup.string()
            .min(5, 'Минимум 5 символов')
            .max(200, 'Максимум 30 символов')
            .required('Обязательно для заполнения'),
          rating: Yup.number()

            // .positive('Цена должна быть больше 0')
            // .truncate()
            .required('Обязательно для заполнения'),
        })}
        onSubmit={(values) => {
          console.log({ values })
          handlerSubmit(values)
        }}>
        <Form className={cn(stl.form)}>
          <label htmlFor='text'>Наименование</label>
          <Field
            name='text'
            type='text'
          />
          <ErrorMessage
            component='span'
            className={cn(stl.error)}
            name='text'
          />
          <label htmlFor='rating'>Рейтинг</label>
          <Field
            as='select'
            name='rating'>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Field>

          <ErrorMessage name='rating' />

          <button type='submit'>Отправить отзыв</button>
        </Form>
      </Formik>
    </div>
  )
}
