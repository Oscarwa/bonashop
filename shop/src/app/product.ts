export class Product {

    constructor(
        public title: string,
        public description: string,
        public date_created: string,
        public date_available: string,
        public cost: number,
        public price: number,
        public amountDiscount:number,
        public percentageDiscount: number,
        // price(): number {
        //     if(!!this.cost.amountDiscount) {
        //         return 1;
        //     }
        // },
        // public category: {
        public cat_women: boolean,
        public cat_men: boolean,
        public cat_child: boolean,
        public cat_all: boolean,
        // },
        tags: string[],
        public photos: any[]
    ) { }
}