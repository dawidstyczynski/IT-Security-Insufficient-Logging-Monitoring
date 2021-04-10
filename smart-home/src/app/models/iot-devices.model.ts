
export class IoTDecice {
    constructor(name: string,
                purpose: string,
                minValue: number,
                maxValue: number,
                currentValue: number) {
        this.Name = name;
        this.Purpose = purpose;
        this.MinValue = minValue;
        this.MaxValue = maxValue;
        this.CurrentValue = currentValue;
    }

    public Name: string;

    public Purpose: string;

    public MinValue: number;

    public MaxValue: number;

    public CurrentValue: number;
}
