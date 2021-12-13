const Item = require('../../models/Item')

describe('Item', () => {
	it('can be created successfully', async () => {
		const item = await Item.create({ name: 'test', content: 'yo' })

		console.log('Item:', item)

		expect(item).toMatchObject({ name: 'break' })
	})
})
