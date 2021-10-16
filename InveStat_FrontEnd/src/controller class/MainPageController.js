const portfolioList = [
  {
    id: "portfolio 1",
    portfolioName: "portfolio 1",
    totalValue: 1250,
    pnl: 250,
    ytdReturn: 0.25,
  },
  {
    id: "adff",
    portfolioName: "portfolio 2",
    totalValue: 1550,
    pnl: 250,
    ytdReturn: 0.25,
  },
];

export function getPortfolioList() {
  return portfolioList;
}

export function addPortfolio(newPortfolio) {
  portfolioList.push(newPortfolio);
  console.log(portfolioList);
}

export default {
  addPortfolio,
  getPortfolioList,
};
