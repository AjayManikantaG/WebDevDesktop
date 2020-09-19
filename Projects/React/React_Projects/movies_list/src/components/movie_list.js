const movie = [
    {
        key: 1,
        name: "Terminator",
        genre: "Action",
        stock: 6,
        rate: 2.5,
        loved: false,
    },
    {
        key: 2,
        name: "Die Hard",
        genre: "Thriller",
        stock: 4,
        rate: 1.5,
        loved: false,
    },
    {
        key: 3,
        name: "Trip to Italy",
        genre: "Love",
        stock: 10,
        rate: 5.6,
        loved: false,
    },
    {
        key: 4,
        name: "Airplane",
        genre: "Comedy",
        stock: 7,
        rate: 3.5,
        loved: false,
    },
    {
        key: 5,
        name: "Need for speed",
        genre: "Action",
        stock: 16,
        rate: 7.5,
        loved: false,
    },
]

function getMovies() {
    return movie;
}

export default getMovies;