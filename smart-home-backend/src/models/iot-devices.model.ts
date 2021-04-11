
export class IoTDecice {
    constructor(id: string,
                name: string,
                purpose: string,
                minValue: number,
                maxValue: number,
                currentValue: number) {
        this.Id = id;
        this.Name = name;
        this.Purpose = purpose;
        this.MinValue = minValue;
        this.MaxValue = maxValue;
        this.CurrentValue = currentValue;
    }

    public Id : string;

    public Name: string;

    public Purpose: string;

    public MinValue: number;

    public MaxValue: number;

    public CurrentValue: number;
}
