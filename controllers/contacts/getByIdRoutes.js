const {getContactById} = require('../../model')

const getByIdRoutes = async (req, res, next) => {
  const { id } = req.params
  const contact = await getContactById(id)
  if (contact) {
    return res.status(200).json(contact)
  }
  res.status(404).json({ "message": "Not found" })
}

module.exports = getByIdRoutes