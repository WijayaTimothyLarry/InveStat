var Sequelize = require('sequelize');
const {transaction} = require("../models");
const {purchasedStock} = require("../models");

async function updateValue(req, res, next) {
    const portfolioId = req.header('portfolioId');
    let currentPurchasedStock = await purchasedStock.findAll({
            where: {
                portfolioId: portfolioId
            }
        })
        .catch((e) => {
            console.log(e.message);
        });

    const result = JSON.parse(JSON.stringify(currentPurchasedStock));
    result.forEach(async function (result) {
        var purchasedStockId = result.id;
        console.log(purchasedStockId);

        //get total amount
        let totalAmount = await transaction.findAll({
            where: {
                "purchasedStockId": purchasedStockId
            },
            attributes: [
                [Sequelize.fn('sum', Sequelize.col('changeInQuantity')), 'changeInQuantity'],
            ],
            group: ['purchasedStockId'],
        }).catch((e) => {
            console.log(e.message);
        });

        const totalAmountJson = JSON.parse(JSON.stringify(totalAmount));
        const totalAmountValue = parseInt(totalAmountJson[0]['changeInQuantity']);

        //update value
        const updatedStock = await purchasedStock.update({
            "totalQuantity": totalAmountValue
        }, {
            where: {
                "id": purchasedStockId
            }
        }).catch(e => {
            console.log(e);
        });
    });
    next()
};

module.exports = updateValue;