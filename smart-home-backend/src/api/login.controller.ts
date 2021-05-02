import { Router, Request, Response } from 'express';
import { UserRecord } from '../models/userRecord';
import { UserTableService } from '../services/usertable.service';

const router = Router();

const userTable = new UserTableService();

router.post('/', (req: Request, res: Response) => {
      console.log('Request to log in.');
      console.info(req.body);
      let user : UserRecord = req.body;
      userTable.LoginUser(user)
      .then((user) =>{
            res.status(200).send(user);
      })
      .catch((error) =>{
            console.log(error);
            res.status(500).send();
      });
});

export const loginController: Router = router;
