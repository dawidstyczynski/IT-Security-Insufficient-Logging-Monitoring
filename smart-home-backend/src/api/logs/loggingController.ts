import { Router, Request, Response } from 'express';
import { DatabaseTable } from '../../config/database-table.enum';
import { DatabaseService } from '../../services/database.service';
import {LogModel} from '../../../../models/log.model';

const router = Router();
const databaseService = new DatabaseService();


router.post('/', (req: Request, res: Response) =>{
      console.log('Request to post log.');
      let log : LogModel = req.body;
      databaseService.insert<LogModel>(log, DatabaseTable.Log)
      .then(success =>{
            res.status(200).send(success);
      })
      .catch(error =>{
            console.log(error);
            res.status(500).send();
      })
      
})

router.get('/:min/:max', (req: Request, res: Response) =>{
      console.log('Request to get logs.');
      let {min, max} = req.params;
      let minValue = +min;
      let maxValue = +max;
      databaseService.getSomeEntries<LogModel>(minValue, maxValue, DatabaseTable.Log)
      .then(logs => {
            res.status(200).send(logs);
      })
      .catch(error =>{
            console.log(error);
            res.status(500).send();
      });
});

export const loggingController: Router = router;