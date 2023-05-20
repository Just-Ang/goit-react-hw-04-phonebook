import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './contactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import Filter from './Filter/Filter';
const allContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(savedContacts ?? allContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmit = values => {
    const contactEl = {
      id: nanoid(),
      name: values.name,
      number: values.number,
    };

    contacts.map(contact => {
      if (contact.name === values.name) {
        return alert(`${values.name} is already in contacts`);
      }
      return null;
    });
    const newContacts = contacts.filter(
      contact => contact.name !== values.name
    );

    setContacts([contactEl, ...newContacts]);
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
  };

  const visibleContacts = getVisibleContacts();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={formSubmit} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList contacts={visibleContacts} onDeleteContact={deleteContact} />
    </div>
  );
};
