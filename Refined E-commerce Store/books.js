
let books; //global variable

async function renderBooks(filter) {
  const booksWrapper = document.querySelector('.books'); // .books is the class in html  which we aim to filter indiviually 

  booksWrapper.classList += ' books__loading'  //preloader of books

  if (!books) {
    books = await getBooks(); //if there isno books why have a loader?
  }
  booksWrapper.classList.remove('books__loading'); //remove preloader after 1s promise is resolved


  if (filter === 'LOW_TO_HIGH') { // we want to filter the books from low to high
    books.sort((a, b) => (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)); //.sort creats a different array from .map which will sort from low to high
  } // all operator take one if the other doesnt exist
  else if (filter === 'HIGH_TO_LOW') {
    books.sort((a, b) => (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)); //filtered now from high to low
  }
  else if (filter === 'RATING') {
    books.sort((a, b) => b.rating - a.rating); //Filtering highest rating to lowest
  }

  const booksHtml = books.map((book) => { //.map creates an array containing each book
    return `<div class="book">
      <figure class="book__img--wrapper">
        <img class="book__img" src="${book.url}" alt=""> 
      </figure>
      <div class="book__title">
        ${book.title}
      </div>
      <div class="book__ratings">
        ${ratingsHTML(book.rating)}
      </div>
      <div class="book__price">
        ${priceHTML(book.originalPrice, book.salePrice)}
      </div>
    </div>`
  }).join(""); // .join removes the commas between elements of the array. .tofixed makes prices of 2 dp



  booksWrapper.innerHTML = booksHtml // this connects the html data to the js 

}

function priceHTML(originalPrice, salePrice) {
  if (!salePrice) {
    return `$${originalPrice.toFixed(2)}`
  }
  return `<span class="book__price--normal">$${originalPrice.toFixed(2)}</span> $${salePrice.toFixed(2)}`
}

function ratingsHTML(rating) {
  let ratingHTML = '';
  for (let i = 0; i < Math.floor(rating); ++i) { //for loop to run though each number of stars for each book. Math.floor rounds down to nearest integer
    ratingHTML += '<i class="fas fa-star"></i>'
  }

  if (!Number.isInteger(rating)) {
    ratingHTML += '<i class="fas fa-star-half-alt"></i>' //if the rating isnt an iteger print a half start
  }
  return ratingHTML;
}

function filterBooks(event) {
  renderBooks(event.target.value); // this targets a function inside a funtion to show each books in the right format stated in html and css
}

setTimeout(() => {
  renderBooks();
});


// FAKE DATA
function getBooks() {
  return new Promise((resolve) => { // promise created to reveal books afdter 1s
    setTimeout(() => {
      resolve([
        {
          id: 1,
          title: "Crack the Coding Interview",
          url: "assets/crack the coding interview.png",
          originalPrice: 49.95,
          salePrice: 14.95,
          rating: 4.5,
        },
        {
          id: 2,
          title: "Atomic Habits",
          url: "assets/atomic habits.jpg",
          originalPrice: 39,
          salePrice: null,
          rating: 5,
        },
        {
          id: 3,
          title: "Deep Work",
          url: "assets/deep work.jpeg",
          originalPrice: 29,
          salePrice: 12,
          rating: 5,
        },
        {
          id: 4,
          title: "The 10X Rule",
          url: "assets/book-1.jpeg",
          originalPrice: 44,
          salePrice: 19,
          rating: 4.5,
        },
        {
          id: 5,
          title: "Be Obsessed Or Be Average",
          url: "assets/book-2.jpeg",
          originalPrice: 32,
          salePrice: 17,
          rating: 4,
        },
        {
          id: 6,
          title: "Rich Dad Poor Dad",
          url: "assets/book-3.jpeg",
          originalPrice: 70,
          salePrice: 12.5,
          rating: 5,
        },
        {
          id: 7,
          title: "Cashflow Quadrant",
          url: "assets/book-4.jpeg",
          originalPrice: 11,
          salePrice: 10,
          rating: 4,
        },
        {
          id: 8,
          title: "48 Laws of Power",
          url: "assets/book-5.jpeg",
          originalPrice: 38,
          salePrice: 17.95,
          rating: 4.5,
        },
        {
          id: 9,
          title: "The 5 Second Rule",
          url: "assets/book-6.jpeg",
          originalPrice: 35,
          salePrice: null,
          rating: 4,
        },
        {
          id: 10,
          title: "Your Next Five Moves",
          url: "assets/book-7.jpg",
          originalPrice: 40,
          salePrice: null,
          rating: 4,
        },
        {
          id: 11,
          title: "Mastery",
          url: "assets/book-8.jpeg",
          originalPrice: 30,
          salePrice: null,
          rating: 4.5,
        },
      ])
    }, 1000);
  });
};
