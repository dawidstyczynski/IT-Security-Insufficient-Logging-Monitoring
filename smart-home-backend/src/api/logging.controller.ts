import { Router, Request, Response } from 'express';
import { DatabaseTable } from '../config/database-table.enum';
import { DatabaseService } from '../services/database.service';
import {HistoryModel} from '../models/history.model';

const router = Router();
const databaseService = new DatabaseService();


router.post('/', (req: Request, res: Response) =>{
      let {log} = req.body;
      let historyEntry : HistoryModel = log;
      databaseService.insert<HistoryModel>(historyEntry, DatabaseTable.Log)
      .then(success =>{
            res.status(200).send(success);
      })
      .catch(error =>{
            res.status(500).send();
      })
      
})

router.get('/', (req: Request, res: Response) =>{
      databaseService.getAllEntries<HistoryModel>(DatabaseTable.Log)
      .then(logs => {
            res.status(200).send(logs);
      })
      .catch(error =>{
            res.status(500).send();
      });
});

export const loggingController: Router = router;