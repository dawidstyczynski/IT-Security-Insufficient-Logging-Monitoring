export class LogModel {
    
    constructor(id: number, date: Date, message: string) {
        this.Id = id;
        this.Date = date;
        this.Message = message;
    }

    public Id: number;

    public Date : Date

    public Message: String;
}