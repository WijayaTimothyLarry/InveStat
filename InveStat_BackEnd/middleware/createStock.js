
const { purchasedStock, portfolio } = require("../models"); 
async function createPStock (req,res,next){
    const purchasedStockInfo = req.body;
    const portfolioId = purchasedStockInfo.portfolioId;
    const stockTickerId = purchasedStockInfo.purchasedStockStockTickerId; 
    var existingStock;

    //check if portoflio exists
    let currentPortfolio = await portfolio
    .findOne({ where: { id: purchasedStockInfo.portfolioId } })
    .catch((e) => {
      console.log(e.message);
      });
    if (!currentPortfolio) {
      res.json("no current portfolio");
      return;
    };
    
    //check if stock exists
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
    
    //if doesn't exist, create a stock
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
