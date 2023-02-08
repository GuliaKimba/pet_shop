import { useMutation } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import stl from './addCommentStyles.module.scss'
import { addRev } from '../../../redux/reviewsSlice/revSlice'

export function AddComment() {
  const params = useParams()
  const idProd = params._id
  const dispatch = useDispatch()
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

  const { mutateAsync } = useMutation({
    mutationFn: addNewReview,
  })

  const handlerSubmit = async (values) => {
    console.log({ values })
    await mutateAsync(values)

    dispatch(addRev())
  }

  return (
    <div className={cn(stl.formik)}>
      <Formik
        initialValues={{
          text: '',
        }}
        validationSchema={Yup.object({
          text: Yup.string()
            .min(5, 'Минимум 5 символов')
            .max(200, 'Максимум 30 символов')
            .required('Обязательно для заполнения'),
        })}
        onSubmit={(values) => {
          handlerSubmit(values)
        }}>
        <Form className={cn(stl.form)}>
          {/* <label htmlFor='text'>Комментарий</label> */}
          <div className={cn(stl.review)}>
            <Field
              className={cn(stl.field)}
              name='text'
              as='textarea'
              placeholder='Отзыв'
            />
            <ErrorMessage
              component='span'
              className={cn(stl.error)}
              name='text'
            />
          </div>
          <div className={cn(stl.rating)}>
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
          </div>
          <button
            className={cn(stl.add__comment_btn)}
            type='submit'>
            Отправить отзыв
          </button>
        </Form>
      </Formik>
    </div>
  )
}
