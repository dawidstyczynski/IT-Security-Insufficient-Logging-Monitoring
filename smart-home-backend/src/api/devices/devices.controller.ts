import { Router, Request, Response } from 'express';
import { DatabaseTable } from '../../config/database-table.enum';
import { DatabaseService } from '../../services/database.service';
import { IoTDecice } from '../../../../models/iot-devices.model';

const router = Router();
const databaseService = new DatabaseService();

router.get('/', (req: Request, res: Response) => {
      console.log('Request to get all devices..');
      databaseService.getAllEntries<IoTDecice[]>(DatabaseTable.Devices)
      .then((devices) => res.status(200).send(devices))
      .catch((error) => res.status(500).send());
});

router.post('/', (req: Request, res: Response) => {
    console.log('Request to post a IoT Device');
    databaseService.insert<IoTDecice[]>(req.body, DatabaseTable.Devices)
    .then((devices) => res.status(200).send(devices))
    .catch((error) => res.status(500).send());
});

export const devicesController: Router = router;
