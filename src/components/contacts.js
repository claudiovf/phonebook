import React from 'react'

const Contacts = ({names, filter, delContact}) => {
    let namesList = []

    if(filter === '') {
      namesList = names.map(person => {
        return(
          <li key={person.name}>{person.name} {person.number}
            <button onClick={() => delContact(person.id, person.name)}>Delete</button>
          </li>
        )
      })
    }else{
      let filtered = names.filter(person => {
        return person.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1
      }) 
  
      namesList = filtered.map(person => {
        return(
          <li key={person.name}> {person.name} {person.number}
            <button onClick={() => delContact(person.id, person.name)}>Delete</button>
          </li>
        )
      })
    }
    return (
      <ul>
        {namesList}
      </ul>
    )
  }
  export default Contacts