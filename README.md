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

## License
This project is released under the open-source [MIT License](https://github.com/Kuatsu/react-native-expo-ts-boilerplate/blob/master/LICENSE).
