# express-mysql-ts-boilerplate

This is a simple boilerplate for Express.js server applications using MySQL and Typescript. It has the following features:
* Full TypeScript support 😍
* Completely using the new JavaScript standard ESModules 🥳
* Uses Docker to easily and securely deploy the application to new systems 🐳
* MySQL (MariaDB) as a relational database management system using [mysql2/promise](https://github.com/sidorares/node-mysql2) 💽
* JSON Web Tokens for secure authentification of API consumers 🔒
* Thorough API validation using [Joi](https://joi.dev/) 🔍
* HTTP header security using the popular middleware [helmet](https://github.com/helmetjs/helmet) 🪖
* Linting and preconfigured style guides using ESLint the great plugin from [Airbnb](https://github.com/airbnb/javascript) ✅
* [Husky](https://github.com/typicode/husky) hook to lint commit messages using [conventional-commit rules](https://github.com/conventional-changelog/commitlint) 🥸
* Scalable and easy-to-understand Controller, Service, Model layer architecture 📈
* Manual Dependency Injection for easy unit testing with no complex mocking 💉
* Completely open-source using the [MIT license](https://github.com/Kuatsu/react-native-expo-ts-boilerplate/blob/master/LICENSE)! ✨

## Getting started
Simply clone this repository using `git clone https://github.com/Kuatsu/express-mysql-ts-boilerplate my_cool_project`, copy `.env.example` and `.app.env.example` to `.env` and `.app.env` respectively, fill in the values, and start working. It's really that simple!

To start up the Docker containers, simply run `docker-compose up -d --build`. Docker Compose will fill in the rest of the needed environment variables for the Node application.
When `NODE_ENV` in `.app.env` is set to `development`, the Node app will reload on changes using [Nodemon](https://github.com/remy/nodemon).

## FAQ
### What layer architecture is used?
This boilerplate uses the very popular Controller, Service, Model architecture. It ensures that database operations and API calls are isolated from business logic. Your Express API calls are handled by a Controller which speaks to one or multiple Services that handle your business logic. To do that, those Services speak to one or multiple Models which are the closest layer to the database and only handle the raw database operations.

Also, the boilerplate makes heavy use of manual dependency injection: Every Controller, Service and Model as well as Middleware receives its dependencies through the constructor. While this might look funky on the first look if you've never worked with something like this, it makes total sense once you're setting up unit tests: When you want to test a Controller, you don't need to define complex mocks for the Service and Model layers but instead you can simply define those as very simple mock functions and inject those through the constructor of the Controller you want to test.

### Why do your JSON Web Tokens expire only after 60 days? That's so insecure!
You're completely right – maybe. See: This boilerplate was mainly built around our own usecases in our day-to-day work as a digital agency focusing on the development of hybrid mobile and web apps. Especially with mobile apps, the expiration of JWT tokens can often pose a problem to the developer(s): Most of the time, apps want to keep their users logged in for as long as possible without the user having to re-authenticate himself (even though there are some exceptions to this like banking apps, of course). However, the user might not open the app for weeks. Therefore, refreshing JWTs early on is often not an option. That's why for many of our customer projects we've settled for a 60-day expiration date and revoke old tokens when a new one is requested (as soon as the user opens the app). If anything bad happens, we usually offer an API endpoint to revoke all existing tokens for a given user - which the user sees as "Log out from all devices" within the UI.

Therefore: **Please make your own choices around the security of your application.** We cannot cater to every usecase and yours might be a very different one to what we're usually working on.

## License
This project is released under the open-source [MIT License](https://github.com/Kuatsu/react-native-expo-ts-boilerplate/blob/master/LICENSE).
