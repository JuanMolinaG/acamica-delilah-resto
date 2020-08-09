# Delilah Restó CRUD

NodeJs API with a CRUD to MySql and user registration/authentication for Acámica FullStack Web Developer course.

Published on: Jun 14, 2020.

Last update: Aug 8, 2020.

## Installation

Clone the repo and move to the server folder:

```bash
git clone https://github.com/JuanMolinaG/acamica-delilah-resto.git
cd acamica-delilah-resto
cd server
```

Install the dependencies:

```bash
npm install
```

Next import the delilah_resto.sql file in your mysql installation and replace the database connection credentials with yours in .env file.

## Start and Watch

```bash
npm run startDev
```

After start the server go to http://localhost:3000/api/docs in the browser to see the API documentation

## Language and Tools

- [NodeJs](https://nodejs.org/)
- [JWT](https://jwt.io/) - Auth web tokens
- [MySQL](https://www.mysql.com/) - Database
- [dotenv](https://www.npmjs.com/package/dotenv) - Environment variables
- [bcrypt](https://www.npmjs.com/package/bcrypt) - Passwords encrypt
- [@hapi/joi](https://www.npmjs.com/package/@hapi/joi) - Data validation
- [Express](https://expressjs.com/) - API routing
- [Sequelize](https://sequelize.org/v5) - MySQL ORM
- [swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express) - API documentation

## Wish list

- Implement unit testing
- Deploy in functional server

## License

[GNU GPLv3](https://choosealicense.com/licenses/gpl-3.0/)
