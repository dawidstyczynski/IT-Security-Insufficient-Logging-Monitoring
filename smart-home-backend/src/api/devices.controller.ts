import { Router, Request, Response } from 'express';
import { DatabaseTable } from '../config/database-table.enum';
import { DatabaseService } from '../services/database.service';
import { IoTDecice } from '../models/iot-devices.model';
import { logger } from '../services/logging.service';

const router = Router();
const databaseService = new DatabaseService();

router.get('/', (req: Request, res: Response) => {
      databaseService.getAllEntries<IoTDecice>(DatabaseTable.Devices)
      .then((devices) => res.status(200).send(devices))
      .catch((error) => res.status(500).send());
});

router.post('/', (req: Request, res: Response) => {
    let entity : IoTDecice = req.body;
    databaseService.insert<IoTDecice>(entity, DatabaseTable.Devices)
    .then((success) => res.status(200).send(success))
    .catch((error) => res.status(500).send());
});

router.patch('/', (req: Request, res: Response) => {
    let {filter, data} = req.body;
    databaseService.patch<IoTDecice>(data, filter, DatabaseTable.Devices)
    .then((success) => res.status(200).send(success))
    .catch((error) => res.status(500).send());
});

export const devicesController: Router = router;
