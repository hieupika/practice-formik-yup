import React from 'react';
import { Field, Form, Formik } from 'formik';

type Props = {};

interface MyFormValues {
  firstName: string;
}

const initialValues: MyFormValues = { firstName: '' };

const FormikExample = (props: Props) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        console.log({ values, actions });
        alert(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor='firstName'>First Name</label>
        <Field id='firstName' name='firstName' placeholder='First Name' />
        <button type='submit'>Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikExample;
