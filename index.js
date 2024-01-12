const accessKey = "lhGtiOGtgUrDagNORAOufj5kIjAiN0KZiBAJrj-ECdo";

const form = document.querySelector("form");
const inputElem = document.getElementById("search-input");
//const searchBtn = document.getElementById("search-btn");
const showMoreBtn = document.getElementById("show-more-btn");
const searchItems = document.querySelector(".search-items");

let inputData = "";
let page = 1;
async function searchImages() {
  inputData = inputElem.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchItems.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-item");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchItems.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMoreBtn.style.display = "inline";
  }
}

form.addEventListener("submit",(event)=>{
    event.preventDefault();
    page=1;
    searchImages();
});

showMoreBtn.addEventListener("click",()=>{
  searchImages();
})
