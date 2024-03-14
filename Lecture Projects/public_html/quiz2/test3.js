let books = [
    "Philosopher's Stone (1997)",
    "Chamber of Secrets (1998)",
    "Prisoner of Azkaban (1999)",
    "Goblet of Fire (2000)",
    "Order of the Phoenix (2003)",
    "Half-Blood Prince (2005)",
    "Deathly Hallows (2007)"
]

function loopBooks(books) {
    for (let i = 0; i < books.length; i++) {
        console.log('Harry Potter and the ' + books[i] + "\n");
    }
}

loopBooks(books);
