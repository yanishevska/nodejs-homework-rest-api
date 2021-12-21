const {readContent} = require('./readContent')

const getContactById = async (contactId) => {
  const contacts = await readContent()
  const [contactById] = contacts.filter((contact) => contact.id === contactId)
  return contactById
}

module.exports = getContactById