import React, { useState, useEffect } from 'react'
import Filter from './components/contact-filter'
import Contacts from './components/contacts'
import ContactForm from './components/contact-form'
import personsServices from './services/persons'
import Notification from './components/Notification'
import ErrorNotif from './components/ErrorNotif'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newFilter, setNewFilter ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ addedNotification, setAddedNotification ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)

  useEffect(() => {
    personsServices
      .getAll()
      .then(contacts => {
        setPersons(contacts)
      })
  }, [])

const addContact = (event) => {
  event.preventDefault()
  if(persons.find(person => person.name === newName)) {
    if(window.confirm(`${newName} is already in contacts, would you like to replace the old number with the new one?`)) {
      const personToUp = persons.find(person => person.name === newName)
      const updatedPerson = { ...personToUp, number: newNumber}

      personsServices
        .update(updatedPerson.id, updatedPerson)
        .then(returnedContact => {
          setPersons(persons.map(person => person.id !== returnedContact.id ? person : returnedContact))
          setNewName('')
          setNewNumber('')
          return returnedContact
        })
        .catch(error => {
          setErrorMessage(`${newName} was removed from server. Click ADD again to create new contact for ${newName}`)
          setPersons(persons.filter(person => person.name !== newName))
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }else{
    const newPerson = {
      "name": newName,
      "number": newNumber
    }
    if (!(newPerson.name) || !(newPerson.number)) {
      setErrorMessage('Name or Number missing')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
      return console.log(errorMessage)
    }

    personsServices
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setAddedNotification(
          `${returnedPerson.name} was added`
        )
        setTimeout(() => {
          setAddedNotification(null)
        }, 3000)
      })
      .catch(error => {
      
        setErrorMessage(error.response.data)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }
}
const delContact = (id, nameToDel) => {
  if(window.confirm(`Delete ${nameToDel} ?`)) {
    personsServices
      .deletePerson(id)
      .then(setPersons(persons.filter(person => person.id !== id)))
  }
}

const handleChangeFilter = (event) => setNewFilter(event.target.value)
const handleChangeName = (event) => setNewName(event.target.value)
const handleChangeNumber = (event) => setNewNumber(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={addedNotification} />
      <ErrorNotif message={errorMessage} />
      <Filter 
        value={newFilter} 
        handleChange={handleChangeFilter} 
      />
      <h2>Add New</h2>
      <ContactForm 
        addContact={addContact}
        newName={newName}
        handleChangeName={handleChangeName}
        newNumber={newNumber}
        handleChangeNumber={handleChangeNumber} 
      />
      <h2>Numbers</h2>
      <Contacts 
        names={persons} 
        filter={newFilter}
        delContact={delContact} 
      />
    </div>
    
  )
}

export default App