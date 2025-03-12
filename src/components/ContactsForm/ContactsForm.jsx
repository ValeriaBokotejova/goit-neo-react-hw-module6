import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { addContact, selectContacts } from '../../redux/contactsSlice';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactsForm.module.css';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short')
    .max(50, 'Too Long')
    .required('Required'),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, 'Invalid format (xxx-xx-xx)')
    .required('Required'),
});

function ContactForm() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;

    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts`);
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <Field type="text" name="name" placeholder="Name" className={css.input} />
        <ErrorMessage className={css.error} name="name" component="div" />

        <Field type="tel" name="number" placeholder="Phone" className={css.input} />
        <ErrorMessage className={css.error} name="number" component="div" />

        <button className={css.button} type="submit">Add Contact</button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
