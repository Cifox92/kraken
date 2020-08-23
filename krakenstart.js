//cron 9:59
const puppeteer = require('puppeteer');
var {
  email,
  password,
  url,
  mini,
  maxi,
  range
} = require('./config');

//Time randomizer
function wait(min, max) {
  let time = Math.random() * (max - min) + min;
  console.log("Waitting", time.toFixed() + ' seconds')
  return time.toFixed() * 1000
}

function delay(dtime) {
  let delay = Math.random() * (dtime - 1) + 1;
  console.log("Delaying", delay.toFixed() * 60 + ' minutes')
  return delay.toFixed() * 1000 * 60

}

setTimeout(() => {


  (async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--lang=es-ES,es']
    });
    const page = await browser.newPage();

    //Goto URL
    await page.goto(url);
    console.log("Going to: ", url)
    await page.waitFor(wait(mini, maxi))


    //Credentials
    const emailselector = '#Input_WithID_1'
    const passwordselector = '#PasswordInput_WithID_2'
    await page.waitFor(wait(mini, maxi))
    await page.waitForSelector(passwordselector);

    console.log("Typing email and password for", email)
    await page.type(emailselector, email);
    console.log("Email filled")
    await page.waitFor(wait(mini, maxi))
    await page.type(passwordselector, password);
    console.log("Password filled")


    await page.waitFor(wait(mini, maxi))
    const loginselector = '#Button_WithID_56';
    await page.waitForSelector(loginselector);
    await page.click(loginselector);
    console.log("Logging")

    await page.on('load', () => console.log('Login completed!'));

    //Start workday
    await page.waitFor(wait(mini, maxi))
    const buttonselector = '.startWork';
    await page.waitForSelector(buttonselector);
    await page.click(buttonselector);
    console.log("Starting workday")

    //Stop workday
    await page.waitFor(wait(mini, maxi))
    const buttonselector = '.stopWork';
    await page.waitForSelector(buttonselector);
    await page.click(buttonselector);
    console.log("Starting workday")

    await page.screenshot({
      path: 'picstart.png'
    });
    await browser.close();
    console.log("Closing!")
  })();

}, delay(range))