import { test, expect } from '@playwright/test';
import tags from '../test-data/tags.json'

test.beforeEach(async ({page}) => {
  await page.route('*/**/api/tags', async route => {
    await route.fulfill({
      body: JSON.stringify(tags)
    })
  })
  await page.goto('https://conduit.bondaracademy.com/', {waitUntil: 'networkidle'})
})

test('has title', async ({ page }) => {
  await expect(page.locator('.navbar-brand')).toHaveText('conduit');
});

test('create the article', async({ request }) => {
  const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
    data:{
      "user":{"email":"test-user2025@test.com", "password":"12345"}
    }
  })

  const responseBody = await response.json()
  const accessToken = responseBody.user.token

  const articleresponse = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
    data: {"title": "404", "description": "Hello 404", "body": "404 again", "tagList": ["tag-1"]},
    headers: {
      authorization: `Token ${accessToken}`
    }
  })

  expect(articleresponse.status()).toEqual(201)
})

