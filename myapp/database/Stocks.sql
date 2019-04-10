
CREATE DATABASE StockMarket;
USE StockMarket;

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

create table StocksByPriceOverTime (
    Symbol VARCHAR(6),
    Market VARCHAR(8),
    PriceDayMinus1 DECIMAL(7,2),
    PriceDayMinus2 DECIMAL(7,2),
    PriceDayMinus3 DECIMAL(7,2),
    PriceDayMinus4 DECIMAL(7,2),
    PriceDayMinus5 DECIMAL(7,2),
    PriceDayMinus6 DECIMAL(7,2),
    PriceDayMinus7 DECIMAL(7,2),
    PriceDayMinus8 DECIMAL(7,2),
    PriceDayMinus9 DECIMAL(7,2),
    PriceDayMinus10 DECIMAL(7,2),
    PriceDayMinus11 DECIMAL(7,2),
    PriceDayMinus12 DECIMAL(7,2),
    PriceDayMinus13 DECIMAL(7,2),
    PriceDayMinus14 DECIMAL(7,2),
    PriceDayMinus15 DECIMAL(7,2),
    PRIMARY KEY(Symbol, Market)
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

INSERT StocksByPriceOverTime (Symbol, Market,PriceDayMinus1, PriceDayMinus2, PriceDayMinus3, PriceDayMinus4, PriceDayMinus5, PriceDayMinus6, PriceDayMinus7, PriceDayMinus8, PriceDayMinus9, PriceDayMinus10, PriceDayMinus11, PriceDayMinus12, PriceDayMinus13, PriceDayMinus14, PriceDayMinus15) VALUE
('AGTK','NASDAQ',333,221,341,109,98,268,133,263,349,197,105,82,104,306,259)
,('BIDU','CPH',277,149,170,108,221,261,164,84,129,309,256,222,329,253,280)
,('CCIH','NASDAQ',151,121,177,310,142,213,85,243,86,174,161,183,113,109,339)
,('GDDY','NASDAQ',100,94,275,266,258,305,234,308,265,133,293,157,136,236,89)
,('GEZI','NASDAQ',131,236,187,218,175,251,245,178,151,279,320,288,189,192,80)
,('GOOGL','NASDAQ',272,292,189,254,112,275,334,206,266,176,312,168,341,155,97)
,('JCOM','NASDAQ',211,307,292,191,183,135,273,107,342,155,232,284,178,177,234)
,('SIM','CPH',103,302,136,160,126,81,253,321,185,214,184,194,145,328,98)
,('VNET','NASDAQ',103,80,202,256,200,337,213,305,175,240,319,286,91,329,135);

