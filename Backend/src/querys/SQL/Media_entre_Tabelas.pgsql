CREATE TABLE proventosFinal AS
SELECT 
    ticker,
    ROUND(SUM(COALESCE("2024", 0))::numeric / NULLIF(COUNT("2024"), 0), 2) AS "2024",
    ROUND(SUM(COALESCE("2023", 0))::numeric / NULLIF(COUNT("2023"), 0), 2) AS "2023",
    ROUND(SUM(COALESCE("2022", 0))::numeric / NULLIF(COUNT("2022"), 0), 2) AS "2022",
    ROUND(SUM(COALESCE("2021", 0))::numeric / NULLIF(COUNT("2021"), 0), 2) AS "2021",
    ROUND(SUM(COALESCE("2020", 0))::numeric / NULLIF(COUNT("2020"), 0), 2) AS "2020",
    ROUND(SUM(COALESCE("2019", 0))::numeric / NULLIF(COUNT("2019"), 0), 2) AS "2019",
    ROUND(SUM(COALESCE("2018", 0))::numeric / NULLIF(COUNT("2018"), 0), 2) AS "2018",
    ROUND(SUM(COALESCE("2017", 0))::numeric / NULLIF(COUNT("2017"), 0), 2) AS "2017",
    ROUND(SUM(COALESCE("2016", 0))::numeric / NULLIF(COUNT("2016"), 0), 2) AS "2016",
    ROUND(SUM(COALESCE("2015", 0))::numeric / NULLIF(COUNT("2015"), 0), 2) AS "2015",
    ROUND(SUM(COALESCE("2014", 0))::numeric / NULLIF(COUNT("2014"), 0), 2) AS "2014",
    ROUND(SUM(COALESCE("2013", 0))::numeric / NULLIF(COUNT("2013"), 0), 2) AS "2013",
    ROUND(SUM(COALESCE("2012", 0))::numeric / NULLIF(COUNT("2012"), 0), 2) AS "2012",
    ROUND(SUM(COALESCE("2011", 0))::numeric / NULLIF(COUNT("2011"), 0), 2) AS "2011",
    ROUND(SUM(COALESCE("2010", 0))::numeric / NULLIF(COUNT("2010"), 0), 2) AS "2010",
    ROUND(SUM(COALESCE("2009", 0))::numeric / NULLIF(COUNT("2009"), 0), 2) AS "2009",
    ROUND(SUM(COALESCE("2008", 0))::numeric / NULLIF(COUNT("2008"), 0), 2) AS "2008"
FROM (
    SELECT ticker, "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008"
    FROM dystatus
    UNION ALL
    --SELECT ticker, "Hoje", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008"
    --FROM dyoceans
    --UNION ALL
    SELECT ticker, "Atual", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008"
    FROM dyinvest
) combined
GROUP BY ticker
ORDER BY ticker;