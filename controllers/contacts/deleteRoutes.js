const {removeContact} = require('../../model')

const deleteRoutes = async (req, res, next) => {
  const { id } = req.params
  const contact = await removeContact(id)
  if (contact) {
    return res.status(200).json({ "message": "Contact deleted" })
  }
  res.status(404).json({ "message": "Not found" })
}

module.exports = deleteRoutes