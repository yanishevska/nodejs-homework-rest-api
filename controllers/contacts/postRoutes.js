const {addContact} = require('../../model')

const postRoutes = async (req, res, next) => {
  const newContact = await addContact(req.body)
  res.status(201).json(newContact)
}

module.exports = postRoutes