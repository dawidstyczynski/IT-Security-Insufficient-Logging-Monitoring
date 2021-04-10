import { Router, Request, Response } from 'express';
import { UserTableService } from '../../services/usertable.service';

const router = Router();


router.post('/', (req: Request, res: Response) => {
      console.log('Request to post log.');
});

router.get('/:username/:id', (req: Request, res: Response) =>{
      console.log('Request to get logs');
});

export const loggingController: Router = router;