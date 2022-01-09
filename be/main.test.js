import supertest from 'supertest'
import main from './main.js'
import request from 'supertest'



describe("demoTest", () => {

    describe("GET /test", () => {
        test("should respond with 200", async() => {
            const response = await request(main).get("/test")
    
            expect(response.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const response = await request(main).get("/test")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        
    })

    describe("GET /signup", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/signup")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/signup")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })

    describe("POST /signup", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja",
            "email": "ee@ee.ee",
            "username": "testin",
            "profilePic": "",
            "pw": "parool"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/signup").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/signup").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
        
    })
    

})
