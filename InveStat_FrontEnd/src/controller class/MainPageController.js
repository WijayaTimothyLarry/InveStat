const portfolioList = [
  {
    _id: "portfolio 1",
    portfolioName: "portfolio 1",
    totalValue: 1250,
    pnl: 250,
    ytdReturn: 0.25,
  },
  {
    _id: "adff",
    portfolioName: "portfolio 2",
    totalValue: 1550,
    pnl: 250,
    ytdReturn: 0.25,
  },
];

export function getPortfolioList() {
  return portfolioList;
}
