const userFactory = require('../factories/user')
const itemFactory = require('../factories/item')
const { createServer, getAgent, authenticate } = require('../helpers')
const Item = require('../../models/Item')

describe('Items', () => {
	let item, customerAgent, server, customer

	beforeAll(async() => {
    server = await createServer()

    customerAgent = await getAgent()
    customer = await authenticate(customerAgent)

		const newItem = await itemFactory.create({ user: customer })
    item = JSON.parse(JSON.stringify(newItem))
	})

  afterAll(async() => {
    await server.close()
  })

  describe('GET /', () => {
    it('returns the expected items', async () => {
      const items = await customerAgent.get('/api/items').then(r => r.body)
      const { user, ...expectedItem } = item

      expect(items.length).toBe(1)
      expect(items[0]).toEqual(expectedItem)
    })

    describe('when queried by an admin', () => {
      it('results include user information', async () => {
        const adminAgent = await getAgent()
        const user = await authenticate(adminAgent, userFactory.build({ type: 'admin' }))
        const items = await adminAgent.get('/api/items').then(r => r.body)

        const userResponse = items[0]['user']

        console.log(userResponse, "\n\n\n", customer)

        expect(userResponse).toEqual(customer)
      })
    })

    describe('when queried by a customer', () => {
      it('results do not include user information', async () => {
        const items = await customerAgent.get('/api/items').then(r => r.body)

        console.log("Items:", items)

        expect(items[0]).not.toHaveProperty('user')
      })
    })
  })
})
