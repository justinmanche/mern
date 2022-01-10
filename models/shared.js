module.exports = {
	stripDefaultFields: record => {
		delete record.__v
		delete record._id
	}
}
