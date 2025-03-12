import css from "./Contact.module.css";
import { SlCallEnd, SlUser } from "react-icons/sl";

function Contact({ contact, deleteContact }) {
  return (
    <li className={css.item}>
      <div className={css.info}>
        <p className={css.name}>
          <SlUser />
          {contact.name}
        </p>
        <p className={css.number}>
          <SlCallEnd />
          {contact.number}
        </p>
      </div>
      <button className={css.button} onClick={deleteContact}>
        Delete
      </button>
    </li>
  );
}

export default Contact;
