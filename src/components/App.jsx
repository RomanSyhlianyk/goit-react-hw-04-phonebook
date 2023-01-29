import { nanoid } from 'nanoid';
import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import css from './App.module.css';

import { Filter } from './Filter/filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts'))
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    const { value } = e.target;

    setFilter(value);
  };

  const addContact = (name, number) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (contacts.find(contact => contact.name === name)) {
      alert(`${contact.name} is already in contacts`);
      return;
    }
    setContacts(prev => {
      return [...prev, contact];
    });
  };

  const filterContactsByName = () => {
    if (filter === '') return contacts;
    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const filteredContacts = filterContactsByName();

  const onDelete = id => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return (
    <div className={css.phonebook}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter onChange={handleFilterChange} />
      <ContactList filteredContacts={filteredContacts} onDelete={onDelete} />
      {contacts.length}
    </div>
  );
};
