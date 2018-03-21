import Server from '../../src'


describe (`Weather Plugin`, () => {
  let server
  beforeEach(async() => {
    server = await Server()

  })

  it(`test the default zipcode`, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/current')
    expect(statusCode).to.be.equal(200)
    expect(result).to.be.an.object()
  })

  it(`testing a city in zip code `, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/current?zipcode=salt%20lake%20city')
    expect(statusCode).to.be.equal(500)
    expect(result).to.be.an.object()
  })

  it(`testing a zip code with an inappropriate error`, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/current?city=84020!')
    expect(statusCode).to.be.equal(500)
    expect(result).to.be.an.object()
  })

  it(`testing a city in zipcode`, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/current?zipcode=salt%20lake%20city')
    expect(statusCode).to.be.equal(500)
    expect(result).to.be.an.object()
  })

  it(`testing forecast with inappropriate zip code`, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/5cast?city=840201')
    expect(statusCode).to.be.equal(500)
    expect(result).to.be.an.object()
  })
  it(`testing with city`, async() => {
    const {statusCode, result} = await server.inject('/v1/weather/5cast?city=salt%20lake%20city')
    expect(statusCode).to.be.equal(200)
    expect(result).to.be.an.object()
  })


})

