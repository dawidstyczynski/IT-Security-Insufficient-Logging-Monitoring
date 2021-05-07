export class HistoryModel {
    
    constructor(user: string, date: Date, message: string) {
        this.User = user;
        this.Date = date;
        this.Message = message;
        this.Id = undefined;
    }

    public Id: number | undefined;
    public User: string;
    public Date : Date
    public Message: String;
}
