MATCH (m:Movie {movieId: 10}) RETURN  size(m.languages) + size(m.countries) + size(m.genres) = 8 AS outcome