import React from 'react'

  const ContactForm = ({ addContact, newName, handleChangeName, newNumber, handleChangeNumber}) => {
  
    return (
      <form onSubmit={addContact}>
          <div>
            Name: <input value={newName} onChange={handleChangeName}/>
          </div>
          <div>
            Number: <input value={newNumber} onChange={handleChangeNumber}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }
  export default ContactForm