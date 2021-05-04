# iodine_cypress_test

IodineSoftware Career Application Test

### What it checks

- opens iodinesoftware.com
- navigates and clicks Company > Careers
- asserts if in Careers page
- looks for Software Development Engineer in Test position
- asserts it exists
- clicks on it
- clicks Apply for this position button
- Fills in information
- Hits cancel

## How to run code

Install dependencies\
`npm install`

Run tests\

- if you have Cypress Desktop application installed locally in your machine run:\
  when Cypress App opens select `main.spec.js` under Tests Tab
  `npm run test:gui`

- if you do not have Cypress Desktop application installed locally run:\
  it will run on your terminal\
  `npm run test:cli`

## Notes

Got `Blocked a frame with origin` Error since we are leaving iodinesoftware.com.

To fix this issue added\
`{ "chromeWebSecurity": false }`
to `/cypress.json` file so it wont throw error when we leave company page to bamboorh.com page

used fixtures to save information to be filled
