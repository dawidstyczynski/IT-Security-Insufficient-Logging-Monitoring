export class LogModel {
    
    constructor(id: number, user: string, date: Date, message: string) {
        this.Id = id;
        this.User = user;
        this.Date = date;
        this.Message = message;
    }

    public Id: number;

    public User: string;
    public Date : Date

    public Message: String;
}