import { Router, Request, Response } from 'express';
import { UserRecord } from '../models/userRecord';
import { logger } from '../services/logging.service';
import { UserTableService } from '../services/usertable.service';

const router = Router();

const userTable = new UserTableService();

router.post('/', (req: Request, res: Response) => {
      let user : UserRecord = req.body;
      
      userTable.LoginUser(user)
      .then((user) => {

            logger.info(user.name, "New Login");

            res.status(200).send(user);
      })
      .catch((error) =>{
            res.status(500).send();
      });
});

export const loginController: Router = router;
