import pkg from './package'
import Fetch from 'node-fetch'
import Joi from 'joi'


const API_KEY = '2c1875a7e53ee6da557044e199f0ba50'

const fetch = async (uri, format) => {
  const response = await Fetch(uri)
  const result = await response.json()

  if (format) {
    return format(result)
  } else {
    return result
  }
}

const currentWeather = (results) => ({
  weather: results.weather[0].main,
  main: results.main,
})
const fiveDayWeather = (results) => ({
  weather: results.list.map(result => ({
    temp: result.main.temp,
    date_time: result.dt_txt
  }))
})

export default {
  pkg,

  async register(server, options = {}) {

    server.route({
      method: 'GET',
      path: '/v1/weather/current',
      options: {
        tags: ['api'],
        validate: {
          query: {
            city: Joi.string(),
            zipcode: Joi.string().min(5).max(10).default(`84101`),
          }
        }
      },
      async handler(request, h) {
        const {city, zipcode = `84111`} = request.query
        if (city) {
          return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},us&APPID=${API_KEY}&units=imperial`, currentWeather)
        } else {
          return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${zipcode},us&APPID=${API_KEY}&units=imperial`, currentWeather)
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/v1/weather/5cast',
      options: {
        tags: ['api'],
        validate: {
          query: {
            city: Joi.string(),
          }
        }
      },
      async handler(request, h) {
        const {city} = request.query
        return await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},us&APPID=${API_KEY}&units=imperial`, fiveDayWeather)
      }
    })
  }
}
