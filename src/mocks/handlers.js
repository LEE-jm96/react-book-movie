import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:5000/products', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "name": "도둑들",
                    "imagePath": "/images/the thieves.jpeg"
                },
                {
                    "name": "오늘의 연애",
                    "imagePath": "/images/love forecast.jpeg"
                }
            ])
        )
    }),
    rest.get('http://localhost:5000/options', (req, res, ctx) => {
        return res(
            ctx.json([
                {
                    "name": "팝콘",
                }
                ,
                {
                    "name": "오징어",
                }
            ])
        )
    }),
    rest.post("http//localhost:5000/order", (req, res, ctx) => {
        let dummyData = [{orderNumber: 23412342, price: 3000}];
        return res(ctx.json(dummyData));
    })
];