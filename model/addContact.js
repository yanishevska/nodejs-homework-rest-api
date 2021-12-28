const {readContent,contactsPath} = require('./readContent')
const fs = require('fs/promises')
const crypto = require('crypto')

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent()
  const newContacts = { id: crypto.randomUUID(), name, email, phone }
  contacts.push(newContacts)
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2),
  )
  return newContacts
}

module.exports = addContact