const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'db', 'contacts.json')

const readContent = async () => {
  const content = await fs.readFile(contactsPath, 'utf8')
  const result = JSON.parse(content)
  return result
}

module.exports ={ readContent, contactsPath}