import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import cn from 'classnames'
import { ErrorMessage, Field, Form, Formik } from 'formik'
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
              wight: Yup.string()
                .min(3, 'Минимум 3 символов')
                .max(30, 'Максимум 30 символов')
                .required('Обязательно для заполнения'),
              discount: Yup.number()

                .truncate()
                .required('Обязательно для заполнения'),
              stock: Yup.number()
                .positive('Остаток должен быть больше 0')
                .truncate()
                .required('Обязательно для заполнения'),
              pictures: Yup.string()
                .matches(
                  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                  'Введите корректный URL адрес!',
                )
                .required('Обязательно для заполнения'),
              description: Yup.string()
                .min(5, 'Минимум 5 символов')
                .max(200, 'Максимум 200 символов')
                .required('Обязательно для заполнения'),
            })}
            onSubmit={(values) => {
              handlerSubmit(values)
            }}>
            <Form className={cn(stl.form)}>
              <label htmlFor='name'>Наименование</label>
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
              <label htmlFor='price'>Цена</label>
              <Field
                className={cn(stl.field)}
                name='price'
                type='number'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='price'
              />
              <label htmlFor='wight'>Вес </label>
              <Field
                className={cn(stl.field)}
                name='wight'
                type='text'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='wight'
              />
              <label htmlFor='discount'>Скидка</label>
              <Field
                className={cn(stl.field)}
                name='discount'
                type='number'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='discount'
              />
              <label htmlFor='stock'>Количество</label>
              <Field
                className={cn(stl.field)}
                name='stock'
                type='number'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='stock'
              />
              <label htmlFor='pictures'>Изображение</label>
              <Field
                className={cn(stl.field)}
                name='pictures'
                type='text'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='pictures'
              />
              <label htmlFor='description'>Описание товара</label>
              <Field
                className={cn(stl.field)}
                name='description'
                as='textarea'
              />
              <ErrorMessage
                component='span'
                className={cn(stl.error)}
                name='description'
              />
              <label htmlFor='available'>Вывести в продажу</label>
              <Field
                name='available'
                type='checkbox'
              />
              <button
                className={cn(stl.formik__btn)}
                type='submit'>
                Создать
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  )
}
