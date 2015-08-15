# evaltest

## Setup
Just needs the usual `npm install` to get going. It starts on port 3000.

## Notes
If you visit an invalid URL you should get a 404 page which is caught by a "catch all".

If you visit `/fail` it will trigger an error handler that will render a generic error page
