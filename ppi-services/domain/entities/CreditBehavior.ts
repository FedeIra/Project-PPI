export class CreditBehavior {
    constructor(
        public nadroCode: string,
        public name: string,
        public rfc: string,
        public creditLimit: number,
        public state: number,
        public stateText: string,
        public createdAt: string,
        public lastUpdate: string,
    ) {}
}