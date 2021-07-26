import Button from "../Button/Button";
import s from "./SubmitForm.module.css";
//import PropTypes from 'prop-types';
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";


export default function SubmitForm ({onSubmit}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value)
  };
  const handleChangeNumber = (e) => {
    setNumber(e.target.value);

  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ name, number, id: uuidv4()});
    setName('');
    setNumber('');
  };

  return (
      <form onSubmit={handleSubmit}>
        <label className={s.label}>
          Name
          <input
            type="text"
            name={name}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
            placeholder="Enter name"
            value={name}
            onChange={handleChangeName}
          />
        </label>
        <label className={s.label}>
          Number
          <input
            type="tel"
            name={number}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
            placeholder="Enter number"
            value={number}
            onChange={handleChangeNumber}
          />
        </label>
        <Button buttonName="Add contact" />
      </form>
    );
}
