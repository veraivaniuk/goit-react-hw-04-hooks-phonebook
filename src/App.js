import "./App.css";
import Container from "./components/Container/";
import Section from "./components/Section";
import SubmitForm from "./components/SubmitForm";
import List from "./components/List";
import FilterContacts from "./components/FilterContacts";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
    });
  const [filter, setFilter] = useState('');

  useEffect(() => {
      window.localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts]);
  
  const onSubmitHandler = (data) => {
    if (contacts.find(el => el.name === data.name)) {
      const notify = () => toast.warn(`${data.name} is already in contacts!`);
      return notify();
    }

    setContacts([data, ...contacts] );
  };


  const handleFilterName = (e) => {
    setFilter(e.currentTarget.value);
  };

  
  const getVisibleContacts = () => {
    return  contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  const onDelete = (id) => {
    setContacts(contacts.filter((el) => el.id !== id));
  };

  return (
      <Container>
        <Section title="Phonebook">
          <SubmitForm onSubmit={onSubmitHandler} />
        </Section>
        <Section title="Contacts">
          <FilterContacts
            filter={filter}
            handleFilterName={handleFilterName}
          />
          <List contacts={() => getVisibleContacts()} onDelete={onDelete} />
        </Section>
        <ToastContainer />
      </Container>
    );
}
