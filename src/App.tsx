import './App.css';

import FormikExample from './components/FormikExample';
import FormikYup from './components/FormikYup';

const App: React.FC<{}> = () => {
  return (
    <div>
      <h2>My Example</h2>
      <FormikExample />

      <h2>Formik + Yup</h2>
      <FormikYup />
    </div>
  );
};

export default App;
