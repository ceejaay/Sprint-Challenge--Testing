const request = require('supertest')

const server = require('./index.js')


describe('server', () => {
  describe('/ route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/')
      expect(response.status).toBe(200)
    })
  })

  describe('/api/games GET route', () => {
    it('should return status code 200', async () => {
      let response = await request(server).get('/api/games')
      // console.log(response)
      expect(response.status).toBe(200)
    })

    it('should return an object', async () => {
      let response = await request(server).get('/api/games')
      expect(typeof response.body).toBe('object')
    })

    it('should return an array even if it is empty', async () => {
      let response = await request(server).get('/api/games')
      expect(response.body.length >= 0).toBe(true)
    })
//this test won't always pass. Above test looking for an object should be sufficient.
    it('should return an object with games in it', async () => {
      let response = await request(server).get('/api/games')
      expect(response.body.length).toBeTruthy()
    })

    it('should return a single game', async () => {
      let response = await request(server).get('/api/games/1')
      expect(response.body).toEqual([{id: 1, name: "Pac-Man", genre: "Arcade", releaseYear: 1980}])
    })
  })

  describe('/api/games POST route', () => {
    it('should get status 201', async () => {
      let response = await request(server)
        .post('/api/games')
        .send({"name": "Burger Time", "genre": "Arcade", "releaseYear": 1980})
      expect(response.status).toBe(201)
    })

    it('should return an id number of the new resource', async () => {
      let response = await request(server)
        .post('/api/games')
        .send({"name": "Dig Dug", "genre": "Arcade", "releaseYear": 1980})
      expect(typeof response.body).toBe('number')
    })

    it('should get back status 422 if the name or genre are empty', async () => {
      let response = await request(server)
        .post('/api/games')
        .send({name: "", genre: "", releaseYear: null})
      expect(response.status).toBe(422)
    })

  })
})
