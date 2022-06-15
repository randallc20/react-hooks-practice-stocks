import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolio, setPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("Alphabetically");
  const [filterBy, setFilterBy] = useState("Tech");

  useEffect(() => {
    fetch("http://localhost:3001/stocks")
      .then((r) => r.json())
      .then(setStocks);
  }, []);

  function handleAddStock(stockToAdd){
    const stockInPortfolio = portfolio.find(
      (stock) => stock.id === stockToAdd.id
    )
    if (!stockInPortfolio) {
      setPortfolio([...portfolio, stockToAdd]);
    }
  }

  function handleDeleteStock(stockToRemove){
    setPortfolio((portfolio) =>
      portfolio.filter((stock) => stock.id !== stockToRemove.id)
    )
  }

  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={stocks} onAddStock={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolio} onDeleteStock={handleDeleteStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
