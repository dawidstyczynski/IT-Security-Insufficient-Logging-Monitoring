import { Router, Request, Response } from 'express';
import { DatabaseTable } from '../../config/database-table.enum';
import { DatabaseService } from '../../services/database.service';

const router = Router();
const databaseService = new DatabaseService();

router.post('/', (req: Request, res: Response) => {
      console.log('Request to post log.');
});

router.get('/:min/:max', (req: Request, res: Response) =>{
      console.log('Request to get logs');
      let {min, max} = req.body;
      

});

export const loggingController: Router = router;