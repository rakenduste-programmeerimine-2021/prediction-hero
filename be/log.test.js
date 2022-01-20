import log, {getTime, writeFallback} from './log.js'



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
    test("test getTime", async() => {
        getTime()
    })
    test("test writeFallback", async() => {
        writeFallback("catastrophic error")
    })
})
