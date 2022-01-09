import log from './log.js'



describe("Logging", () => {
    test("should log info", async() => {
        log.info("testing INFO")
    })
    test("should log info", async() => {
        log.debug("testing DEBUG")
    })
    test("should log warning", async() => {
        log.warn("testing WARNING")
    })
    test("should log error", async() => {
        log.error("testing ERROR")
    })
})
