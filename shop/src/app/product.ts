export class Product {

    constructor(
        public title: string,
        public description: string,
        public date_created: string,
        public date_available: string,
        public cost: {
            value: number,
            price: number,
            amountDiscount:number,
            percentageDiscount: number
        },
        // price(): number {
        //     if(!!this.cost.amountDiscount) {
        //         return 1;
        //     }
        // },
        public category: {
            women: boolean,
            men: boolean,
        },
        tags: string[],
        photos: string[]
    ) { }
}