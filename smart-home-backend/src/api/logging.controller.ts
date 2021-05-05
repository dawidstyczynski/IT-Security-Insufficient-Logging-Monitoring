import { Router, Request, Response } from 'express';
import { DatabaseTable } from '../config/database-table.enum';
import { DatabaseService } from '../services/database.service';
import {HistoryModel} from '../models/history.model';

const router = Router();
const databaseService = new DatabaseService();


router.post('/', (req: Request, res: Response) =>{
      console.log('Request to post log.');
      let log : HistoryModel = req.body;
      databaseService.insert<HistoryModel>(log, DatabaseTable.Log)
      .then(success =>{
            res.status(200).send(success);
      })
      .catch(error =>{
            console.log(error);
            res.status(500).send();
      })
      
})

router.get('/', (req: Request, res: Response) =>{
      console.log('Request to get logs.');
      console.log(req.body);
      console.log(req.params);
      let filter : any = req.body;
      databaseService.getSomeEntries<HistoryModel>(filter, DatabaseTable.Log)
      .then(logs => {
            res.status(200).send(logs);
      })
      .catch(error =>{
            console.log(error);
            res.status(500).send();
      });
});

export const loggingController: Router = router;