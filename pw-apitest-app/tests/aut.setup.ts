import { test as setup } from '@playwright/test';
import user from '../.aut/user.json'
import fs from 'fs'

const authFile = ".aut/user.json"

setup('autorisation', async({page, request}) => {
  // await page.goto('https://conduit.bondaracademy.com/') // ('http://angular.realworld.io/')
  // await page.getByText('Sign In').click()
  // await page.getByRole('textbox', {name: "Email"}).fill('test-user2025@test.com')
  // await page.getByRole('textbox', {name: "Password"}).fill('12345')
  // await page.getByRole('button').click()
  // await page.waitForResponse('https://conduit-api.bondaracademy.com/api/tags') //('https://api/realworld.io/api/tags')

  // await page.context().storageState({path: authFile})

  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', { // ('http://api.realworld.io/api/users/login', {
    data: {
      "user":{"email": "test-user2025@test.com", "password": "12345"}
    }
  })

  const responseBody = await response.json()
  const accessToken = responseBody.user.token
  user.origins[0].localStorage[0].value = accessToken
  fs.writeFileSync(authFile, JSON.stringify(user))

  process.env['ACCESS_TOKEN'] = accessToken

})