import supertest from 'supertest'
import main from './main.js'
import request from 'supertest'



describe("TEST main.js", () => {

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
                ...data
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

    describe("GET /loginFB", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/loginFB")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/loginFB")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("POST /loginFB", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja",
            "email": "ee@ee.ee",
            "username": "testin",
            "profilePic": "",
            "pw": "parool"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/loginFB").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/loginFB").send({
                body: { 
                    "firstname": "test",
                    "lastname": "kastuaja",
                    "email": "ee@ee.ee",
                    "username": "testin",
                    "profilePic": "",
                    "pw": "parool",
                    "social_id": (new Date()).getTime().toString(15)
                }
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/loginFB").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("GET /login", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/login")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/login")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("POST /login", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/login").send({
                body: { 
                    "firstname": "asdasdasdasd",
                    "lastname": (new Date()).getTime().toString(15)
                }
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/login").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/login").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
    
    describe("GET /getuser/1", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/getuser/1")
            expect(response.statusCode).toBe(200)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/getuser/1")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
    describe("POST /getuser/1", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/getuser/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/getuser/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })

    describe("GET /getallteams", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/getallteams")
            expect(response.statusCode).toBe(200)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/getallteams")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
    describe("POST /getallteams", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/getallteams").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/getallteams").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    
    describe("GET /getallmatches", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/getallmatches")
            expect(response.statusCode).toBe(200)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/getallmatches")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
    describe("POST /getallmatches", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/getallmatches").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/getallmatches").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })

    describe("GET /getallusers", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/getallusers")
            expect(response.statusCode).toBe(200)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/getallusers")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
    describe("POST /getallusers", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/getallusers").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/getallusers").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })

    describe("GET /changepassword/1", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/changepassword/1")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/changepassword/1")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("POST /changepassword/1", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/changepassword/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/changepassword/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("PUT /changepassword/1", () => {
        const data = { 
            "newpwhash": "test"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).put("/changepassword/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).put("/changepassword/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })
    
    describe("GET /changeuserdata/1", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/changeuserdata/1")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/changeuserdata/1")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("POST /changeuserdata/1", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/changeuserdata/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/changeuserdata/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("PUT /changeuserdata/1", () => {
        const data = { 
            "newpwhash": "test"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).put("/changeuserdata/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).put("/changeuserdata/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })

    describe("GET /updatepoints/1", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/updatepoints/1")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/updatepoints/1")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("POST /updatepoints/1", () => {
        const data = { 
            "firstname": "test",
            "lastname": "kastuaja"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/updatepoints/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(404)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).post("/updatepoints/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("PUT /updatepoints/1", () => {
        const data = { 
            "newpwhash": "test"
        }
        test("should respond with 200", async() => {
            const respSucc = await request(main).put("/updatepoints/1").send({
                body: data
            })
            expect(respSucc.statusCode).toBe(200)
        })
        test("should respond with JSON", async() => {
            const respJson = await request(main).put("/updatepoints/1").send({
                body: data
            })
            expect(respJson.headers['content-type']).toEqual(expect.stringContaining("json"))
        })
    })





    describe("GET /savepredictions/1", () => {
        test("should respond with 404", async() => {
            const response = await request(main).get("/savepredictions/1")
            expect(response.statusCode).toBe(404)
        })
        test("should respond with HTML", async() => {
            const response = await request(main).get("/savepredictions/1")
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining("html"))
        })
    })
    describe("POST /savepredictions/1", () => {
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/savepredictions/1").send({
                "scores": {
                    "1": {
                        "1": 1,
                        "2": 2
                    },
                    "2": {
                        "1": 4,
                        "2": 5
                    },
                    "3": {
                        "1": 2,
                        "2": 2
                    },
                    "4": {
                        "1": 3,
                        "2": 0
                    },
                    "5": {
                        "1": 0,
                        "2": 2
                    }
                }
            })
            expect(respSucc.statusCode).toBe(200)
        })
    })

    describe("POST /savematchscore", () => {
        test("should respond with 200", async() => {
            const respSucc = await request(main).post("/savematchscore").send({
                "matchScores": {
                    "0":{
                        "1": 2,
                        "2": 1
                    },
                    "1":{
                        "1": 2,
                        "2": 1
                    },
                    "2":{
                        "1": 1,
                        "2": 1
                    },
                    "3":{
                        "1": 0,
                        "2": 0
                    },
                    "4":{
                        "1": 1,
                        "2": 0
                    }
                }
            })
            expect(respSucc.statusCode).toBe(200)
        })
    })

})
