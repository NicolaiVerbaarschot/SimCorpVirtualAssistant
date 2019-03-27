
CREATE DATABASE StockMarket;
USE StockMarket;
drop TABLE Stocks;
create table Stocks (
  Symbol VARCHAR(6),
  Market VARCHAR(8),
  Price  DECIMAL(7,2),
  OpenPrice DECIMAL(7,2),
  DailyHigh DECIMAL(7,2),
  DailyLow  DECIMAL(7,2),
  PRIMARY KEY(Symbol,Market),
  PointChangeToday DECIMAL(5,2) as (Price-OpenPrice) VIRTUAL,
  PercentChangeToday DECIMAL(2,2) as (PointChangeToday/OpenPrice) VIRTUAL
);
INSERT Stocks (Symbol, Market, Price, OpenPrice, DailyHigh, DailyLow) VALUE
('AGTK','NASDAQ',1119.20,1139.82,1112.65,780.61)
,('BIDU','CPH',121.45,134.80,115.76,312.14)
,('CCIH','NASDAQ',174.32,174.91,172.92,816.45)
,('GDDY','NASDAQ',174.32,174.91,172.92,816.45)
,('GEZI','NASDAQ',1119.20,1139.82,1112.65,780.61)
,('GOOGL','NASDAQ',1119.20,1139.82,1112.65,780.61)
,('JCOM','NASDAQ',1119.20,1139.82,1112.65,780.61)
,('SIM','CPH',121.45,134.80,115.76,312.14)
,('VNET','NASDAQ',174.32,174.91,172.92,816.45);


select * from Stocks;