import * as serverConfig from './config/server-config.json';
import express, { Router } from 'express';
import { loginController } from './api/login/login.controller';
import { registrationController } from './api/registration/registration.controller';
import { DatabaseService } from './services/database.service';

const server = express();
server.use('/login', loginController);
server.use('/registration', registrationController);

const databaseService = new DatabaseService();
databaseService.initialize().then(() => {
      server.listen(serverConfig.port, function(){
            console.log("Server is running at https://localhost:${serverConfig.port}");
      });
})
.catch((error) => {
      console.log("Database could not be initialized.");
});



/*
app.patch('/changePW/:id', function(req, res){
      console.log('Request to changePW');
      let { id } = req.params;
      let changePW : ChangePWRecord = req.body;
      console.log(id);
      console.log(changePW.oldPW);
      console.log(changePW.newPW);
      userTable.ChangePW(id, changePW)
      .then((user) =>{
            console.log(user);
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send(error);
      });
})
app.patch('/email', function(req, res){
      console.log('Request to change email.');
      let user : UserRecord = req.body;
      console.log(user);
      userTable.ChangeEmail(user)
      .then((user) =>{
            console.log(user);
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send(error);
      })
})
export interface ChangePWRecord{
      oldPW: string,
      newPW: string,
}
export interface UserRecord{
      name: string,
      password: string,
      email: string,
}
*/
