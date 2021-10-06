// Only delete the relationships for a specific user, then we test the user on re-creating those for the specific user
// use these for now until we figure out the best way to reset
MERGE (apollo:Movie {title: 'Apollo 13', tmdbId: 568, released: '1995-06-30', imdbRating: 7.6})
MERGE (tom:Person {name: 'Tom Hanks', tmdbId: 31, born: '1956-07-09'})
MERGE (meg:Person {name: 'Meg Ryan', tmdbId: 5344, born: '1961-11-19'})
MERGE (danny:Person {name: 'Danny DeVito', tmdbId: 518, born: '1944-11-17'})
MERGE (sleep:Movie {title: 'Sleepless in Seattle', tmdbId: 858, released: '1993-06-25', imdbRating: 6.8})
MERGE (hoffa:Movie {title: 'Hoffa', tmdbId: 10410, released: '1992-12-25', imdbRating: 6.6})
MERGE (jack:Person {name: 'Jack Nicholson', tmdbId: 514, born: '1937-04-22'})
MERGE (sandy:User {name: 'Sandy Jones', userId: 534})
MERGE (clinton:User {name: 'Clinton Spencer', userId: 105})
MERGE (tom)-[:ACTED_IN {role: 'Jim Lovell'}]->(apollo)
MERGE (tom)-[:ACTED_IN {role: 'Sam Baldwin'}]->(sleep)
MERGE (meg)-[:ACTED_IN {role: 'Annie Reed'}]->(sleep)
MERGE (danny)-[:ACTED_IN {role: 'Bobby Ciaro'}]->(hoffa)
MERGE (danny)-[:DIRECTED]->(hoffa)
MERGE (jack)-[:ACTED_IN {role: 'Jimmy Hoffa'}]->(hoffa)
MERGE (sandy)-[:RATED {rating:5}]->(apollo)
MERGE (sandy)-[:RATED {rating:4}]->(sleep)
MERGE (clinton)-[:RATED {rating:3}]->(apollo)
MERGE (clinton)-[:RATED {rating:3}]->(sleep)
MERGE (clinton )-[:RATED {rating:3}]->(hoffa)
MERGE (casino:Movie {title: 'Casino', tmdbId: 524, released: '1995-11-22', imdbRating: 8.2})
MERGE (martin:Person {name: 'Martin Scorsese', tmdbId: 1032})
MERGE (martin)-[:DIRECTED]->(casino)
SET tom:Actor
SET meg:Actor
SET danny:Actor
SET jack:Actor
SET danny:Director
SET martin:Director
MERGE (english:Language {name: 'English'})
MERGE (italian:Language {name: 'Italian'})
MERGE (latin:Language {name: 'Latin'})
MERGE (apollo)-[:IN_LANGUAGE]->(english)
MERGE (sleep)-[:IN_LANGUAGE]->(english)
MERGE (hoffa)-[:IN_LANGUAGE]->(english)
MERGE (casino)-[:IN_LANGUAGE]->(english)
MERGE (apollo)-[:IN_LANGUAGE]->(english)
MERGE (hoffa)-[:IN_LANGUAGE]->(italian)
MERGE (hoffa)-[:IN_LANGUAGE]->(latin)
MERGE (comedy:Genre {name: 'Comedy'})
MERGE (drama:Genre {name: 'Drama'})
MERGE (romance:Genre {name: 'Romance'})
MERGE (adventure:Genre {name: 'Adventure'})
MERGE (imax:Genre {name: 'IMAX'})
MERGE (crime:Genre {name: 'Crime'})
MERGE (apollo)-[:IN_GENRE]->(drama)
MERGE (apollo)-[:IN_GENRE]->(adventure)
MERGE (apollo)-[:IN_GENRE]->(imax)
MERGE (sleep)-[:IN_GENRE]->(drama)
MERGE (sleep)-[:IN_GENRE]->(comedy)
MERGE (sleep)-[:IN_GENRE]->(romance)
MERGE (hoffa)-[:IN_GENRE]->(drama)
MERGE (hoffa)-[:IN_GENRE]->(crime)
MERGE (casino)-[:IN_GENRE]->(drama)
MERGE (casino)-[:IN_GENRE]->(crime)
MERGE (jack)-[:ACTED_IN_1992]->(hoffa)
MERGE (danny)-[:ACTED_IN_1992]->(hoffa)
MERGE (danny)-[:DIRECTED_1992]->(hoffa)
MERGE (tom)-[:ACTED_IN_1993]->(sleep)
MERGE (meg)-[:ACTED_IN_1993]->(sleep)
MERGE (tom)-[:ACTED_IN_1995]->(apollo)
MERGE (martin)-[:DIRECTED_1995]->(casino)