
const { purchasedStock } = require("../models"); 
async function createPStock (req,res,next){
    const purchasedStockInfo = req.body;
    const portfolioId = purchasedStockInfo.portfolioId;
    const stockTickerId = purchasedStockInfo.purchasedStockStockTickerId; 
    console.log(stockTickerId);
    var existingStock;
    try{
       existingStock = await purchasedStock
      .findOne({
        where: {
          portfolioId : portfolioId,
          stockTickerId : stockTickerId
        },
      }).catch((e) => {
        console.log(e.message);
      });
    }catch (err) {
      console.log('err');
    }
  
    if (existingStock=== null) {
      new_stock = await purchasedStock.create({
      "stockTickerId" :stockTickerId,
      "portfolioId" : portfolioId
    });
  
    res.purchasedStockId= new_stock.id;
    console.log('new stock created');
  }
  else{
    res.purchasedStockId= existingStock.id;
    console.log('existing stock exists');
  }
    next()
  }

  module.exports = createPStock;
