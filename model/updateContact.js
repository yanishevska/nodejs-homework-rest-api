const {readContent,contactsPath} = require('./readContent')
const fs = require('fs/promises')

const updateContact = async (contactId, body) => {
  const contacts = await readContent()
  const index = contacts.findIndex((contact) => contact.id === contactId)
 
  if (index !== -1) {
    const updateContact = { id: contactId, ...contacts[index], ...body }
    contacts[index] = updateContact
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    )
    return updateContact
  }

  return null
}

module.exports = updateContact