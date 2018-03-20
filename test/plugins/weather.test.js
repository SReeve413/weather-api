import Server from '../../src'


describe (`Weather Plugin`, () => {
  let server
  beforeEach(async() => {
    server = await Server()

  })

  it(`contains the weather plugin`, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/current')
    expect(statusCode).to.be.equal(200)
    expect(result).to.be.an.object()
  })
})
