import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import cn from 'classnames'
import stl from './editProductFormStyles.module.scss'
import { apiAllProducts } from '../Api/apiProduct'

export function EditProductForm() {
  const navigate = useNavigate()
  const params = useParams()
  const productId = params._id
  console.log({ productId })

  async function editProduct(values) {
    const JWT = JSON.parse(localStorage.getItem('token'))
    const res = await fetch(`https://api.react-learning.ru/products/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${JWT}`,
      },
      body: JSON.stringify(values),
    })
    return res.json()
  }
  const { mutateAsync } = useMutation({
    mutationFn: editProduct,
  })

  const getProductByID = () => apiAllProducts.getCurrentProductById(productId)

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['currentProduct'],
    queryFn: () => getProductByID(productId),
  })
  if (isLoading) return <div>Загрузка</div>

  if (!item) return <div>Это ошибка </div>
  if (isError) return <div>{error.message}</div>
  if (item.err) return navigate('*')

  const handlerSubmit = async (values) => {
    console.log({ values })
    await mutateAsync(values)
    navigate(`/product/${productId}`)
  }

  const handlerCancel = () => {
    navigate(`/product/${productId}`)
  }

  return (
    <div className={cn(stl.new__product)}>
      <div className={cn(stl.container)}>
        <div className={cn(stl.formik)}>
          <h2>Редактировать</h2>
          <Formik
            initialValues={{
              name: item.name,
              price: item.price,
              wight: item.wight,
              discount: item.discount,
              stock: item.stock,
              pictures: item.pictures,
              description: item.description,
              available: item.available,
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
                .min(5, 'Минимум 3 символов')
                .max(10, 'Максимум 30 символов')
                .required('Обязательно для заполнения'),
              discount: Yup.number()

                .truncate()
                .required('Обязательно для заполнения'),
              stock: Yup.number()
                .positive('Остаток должен быть больше 0')
                .truncate()
                .required('Обязательно для заполнения'),
              pictures: Yup.string().required('Обязательно для заполнения'),
              description: Yup.string()
                .min(5, 'Минимум 5 символов')
                .max(200, 'Максимум 200 символов')
                .required('Обязательно для заполнения'),
            })}
            onSubmit={(values) => {
              console.log({ values })
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
