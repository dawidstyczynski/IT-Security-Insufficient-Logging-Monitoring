import * as bp from 'body-parser';
import { UserTableService, initializeDB } from './services/database.service';
import * as cors from 'cors';
import * as express from "express";
import { ChangePWRecord } from '../smart-home-common/ChangePWRecord';
import { UserRecord } from '../smart-home-common/UserRecord';

const app = express();

app.use(bp.urlencoded({extended:false}));
app.use(bp.json());
app.use(cors());

initializeDB();
const userTable = new UserTableService();

app.post('/login', function(req, res){
      console.log('Request to log in.');
      console.info(req.body);
      userTable.LoginUser(req.body)
      .then((user) =>{
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send(error);
      });
})
app.post('/register', function(req, res){
      console.log('Request to register.');
      console.info(req.body);
      userTable.RegisterUser(req.body)
      .then((user) =>{
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send(error);
      });
})
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


app.listen(3000, function(){
      console.log("Start listening on port: 3000");
});
