import { Input } from 'antd';
import { Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import './styles.css';

type Props = {};

type FormValuesType = {
  firstname: string;
  lastname: string;
  email: string;
};

type OtherType = {
  label: string;
  name: string;
  validate?: any;
  options?: Array<{ title: string; value: string | number | boolean }>;
};

const initFormValue = { firstname: '', lastname: '', email: '' };

const FormikYup = (props: Props) => {
  const validateEmail = (value: any) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  };

  const SignUpSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(5, 'Should be 5 character long')
      .max(15, 'should not exceed 15 characters')
      .required('Required'),

    lastname: Yup.string()
      .min(5, 'Should be 5 character long')
      .max(15, 'should not exceed 15 characters')
      .required('Required'),

    email: Yup.string().email('invalid email address').required('Required'),
  });

  const handleSubmit = (value: FormValuesType) => {
    alert(JSON.stringify(value));
  };

  return (
    <div className='info-form'>
      <Formik
        initialValues={initFormValue}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<FormValuesType>) => (
          <Form>
            <InputField label={'First Name'} name='firstname' {...props} />
            <InputField label={'Last Name'} name='lastname' {...props} />
            <SelectField
              label={'Sex'}
              name='sex'
              {...props}
              options={[
                { title: 'Male', value: 'male' },
                { title: 'Female', value: 'female' },
              ]}
            />
            <InputField
              label={'Email'}
              name='email'
              validate={validateEmail}
              {...props}
            />

            <button className='submit-form-btn' type='submit'>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const InputField = (props: FormikProps<FormValuesType> & OtherType) => {
  const { errors, touched, label, name, validate } = props;

  // @ts-ignore
  const errorMessage = errors[name] && touched[name] ? errors[name] : '';

  return (
    <div className='field-box'>
      <label className='field-label'>{label}:</label>
      <div className='field-aside'>
        <Field name={name} validate={validate} className='field-input' />
        <div className='field-error'>{errorMessage}</div>
      </div>
    </div>
  );
};

const SelectField = (props: OtherType & FormikProps<FormValuesType>) => {
  const { label, name, options = [] } = props;

  return (
    <div className='field-box'>
      <label className='field-label'>{label}:</label>
      <div className='field-aside'>
        <Field as='select' name={name} className='field-select'>
          {options.map((e: any, index) => (
            <option key={index} value={e.value}>
              {e.title}
            </option>
          ))}
        </Field>
      </div>
    </div>
  );
};

export default FormikYup;
