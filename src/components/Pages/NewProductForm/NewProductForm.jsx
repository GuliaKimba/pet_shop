import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { apiAllProducts } from '../../Api/apiProduct'
import stl from './newProductFormStyles.module.scss'

const addNewProductFetch = (values) => apiAllProducts.addNewProduct(values)
export function NewProductForm() {
  const navigate = useNavigate()
  const { mutateAsync } = useMutation({
    mutationFn: addNewProductFetch,
    onSuccess: () => {
      navigate('/')
    },
  })

  const handlerSubmit = async (values) => {
    await mutateAsync(values)
  }
  return (
    <div className={cn(stl.new__product)}>
      <div className={cn(stl.container)}>
        <div className={cn(stl.formik)}>
          <Formik
            initialValues={{
              name: '',
              price: '',
              wight: '',
              discount: '',
              stock: '',
              pictures: '',
              description: '',
              available: true,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .min(5, 'Минимум 5 символов')
                .max(30, 'Максимум 30 символов')
                .required('Обязательно для заполнения'),
              price: Yup.number()
                .positive('Цена должна быть больше 0')
                .truncate()
                .required('Обязательно для заполнения'),
              description: Yup.string()
                .min(5, 'Минимум 5 символов')
                .max(100, 'Максимум 100 символов')
                .required('Обязательно для заполнения'),
            })}
            onSubmit={(values) => {
              console.log({ values })
              handlerSubmit(values)
            }}>
            <Form className={cn(stl.form)}>
              <label htmlFor='name'>Наименование</label>
              <Field
                name='name'
                type='text'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='name'
              />
              <label htmlFor='price'>Цена</label>
              <Field
                name='price'
                type='number'
              />
              <ErrorMessage name='price' />
              <label htmlFor='wight'>Вес </label>
              <Field
                name='wight'
                type='text'
              />
              <label htmlFor='discount'>Скидка</label>
              <Field
                name='discount'
                type='number'
              />
              <label htmlFor='stock'>Количество</label>
              <Field
                name='stock'
                type='number'
              />
              <label htmlFor='pictures'>Изображение</label>
              <Field
                name='pictures'
                type='text'
              />
              <ErrorMessage name='pictures' />
              <label htmlFor='description'>Описание товара</label>
              <Field
                name='description'
                as='textarea'
              />
              <ErrorMessage name='description' />
              <label htmlFor='available'>Вывести в продажу</label>
              <Field
                name='available'
                type='checkbox'
              />
              <button type='submit'>Создать</button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
