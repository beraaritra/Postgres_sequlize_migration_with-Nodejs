start : - sequelizerc

commmend for create config.js file :-    npx sequelize-cli init

commend for create databases :-   npx sequelize-cli db:created

commend for generate signup model&migrations file :-  npx sequelize-cli model:generate --name user --attributes userType:ENUM,fristName:string,lastName:string,email:string,password:string

commmend for run migrations file:- npx sequelize-cli db:migrate

commend for revert back or delete table :- npx sequelize-cli db:migrate:undo

commend for generate project model&migrations file :-  npx sequelize-cli model:generate --name project --attributes titile:string