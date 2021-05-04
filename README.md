# iodine_cypress_test

IodineSoftware Career Application Test

## How to run code

Install dependencies\
`npm install`

Run tests\
`npm run test`

## Notes

Got `Blocked a frame with origin` Error since we are leaving iodinesoftware.com.

To fix this issue added\
`{ "chromeWebSecurity": false }`
to `/cypress.json` file so it wont throw error when we leave company page to bamboorh.com page
