import { Formik, Form, Field } from 'formik'

export function SingInForm() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        console.log({ values })
      }}>
      <Form>
        <Field
          name='email'
          type='email'
        />
        <Field
          name='password'
          type='password'
        />
        <button type='button'>Войти</button>
      </Form>
    </Formik>
  )
}
