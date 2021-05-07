export class HistoryModel {
    
    constructor(user: string, date: Date, message: string) {
        this.Id = undefined;
        this.User = user;
        this.Date = date;
        this.Message = message;
    }

    public Id: number | undefined;

    public User: string;
    public Date : Date

    public Message: String;
}