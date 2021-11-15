// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('facotorial', function () {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function () {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function () {
    await driver.quit();
  })
  it('facotorial', async function () {
    await driver.get("http://localhost:3000")
    await driver.manage().window().setRect({ width: 1936, height: 1056 })
    settimeout(3000)
    await driver.findElement(By.id("AAAAAAAAAAHG")).click()
    settimeout(3000)
    await driver.findElement(By.linkText("Factorial")).click()
    settimeout(3000)
    await driver.findElement(By.id("input")).click()
    await driver.findElement(By.id("input")).sendKeys("10")
    settimeout(3000)
    await driver.findElement(By.id("button")).click()
    settimeout(3000)
    if (!(await driver.findElement(By.id("response")).getText()) == "3628800") {
      throw error();
    } else {
      settimeout(3000)
      await driver.close()
    }

  })
})


function settimeout(tiempo) {
  let a = 0
  while (a < (tiempo * 1000000)) a++
}