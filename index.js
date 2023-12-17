const cl = console.log.bind(console);

const wrapper = document.getElementById("wrapper");

fetch("https://fakestoreapi.com/products?limit=20")
  .then((res) => res.json())
  .then((data) => eventListerEkleme(data));

const filters = document.getElementsByClassName("buton");

const finder = document.getElementById("priceGapFinder");
const lowestPrice = document.getElementById("lowest");
const highestPrice = document.getElementById("highest");

const searchBar = document.getElementById("default-search");
const searchBtn = document.getElementById("searchBtn");

const sepet = document.getElementById("sepet");
sepet.addEventListener("click", () => {
  sepetWrapper.classList.toggle("aktif");
});

const sepetWrapper = document.getElementById("sepetWrapper");

let basketArr = [];

function addToBasket(i) {
  basketArr.push(i);
  sepetWrapper.innerHTML = "";
  const total = document.createElement("p");
  total.classList = "absolute bottom-0 font-bold text-xl bg-stone-0";
  let toplamfiyat = 0;
  cl(i);
  for (let i of basketArr) {
    toplamfiyat += i.price;
    const div = document.createElement("div");
    div.classList = "flex flex-col bg-stone-400 rounded w-3/4 my-4";
    div.innerHTML = `
    <h1 class='font-bold'>${i.title}</h1>
    <p>${i.price}</p>
    `;
    sepetWrapper.appendChild(div);
  }
  total.innerHTML = `TOPLAM: ${toplamfiyat}$`;
  sepetWrapper.appendChild(total);
}

function eventListerEkleme(data) {
  listProducts(data);
  for (let i = 0; i < filters.length; i++) {
    filters[i].addEventListener("click", () =>
      listProducts(data, "", filters[i].value)
    );
  }

  finder.addEventListener("click", () => listProducts(data));

  searchBtn.addEventListener("click", () =>
    listProducts(data, searchBar.value)
  );
}

function listProducts(data, parameter = "", category = "") {
  wrapper.innerHTML = "";
  function starCalculator(star) {
    let starArray = [];
    for (let i = 0; i < star; i++) {
      starArray.push(`<svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>`);
    }

    for (let i = starArray.length; i < 5; i++) {
      starArray.push(`<svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
        </svg>`);
    }
    return starArray;
  }

  for (let i in data) {
    if (
      data[i].title.toLowerCase().includes(parameter.toLowerCase()) &&
      data[i].category.includes(category) &&
      data[i].price < highestPrice.value &&
      data[i].price > lowestPrice.value
    ) {
      const card = document.createElement("div");
      const btn = document.createElement("button");
      btn.classList =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 w-full ";
      btn.textContent = "Sepete Ekle";
      btn.addEventListener("click", () => addToBasket(data[i]));

      card.innerHTML = `
        <div class="w-64 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:scale-125 transition-transform h-84 mb-6">
            <a href="#">
                <img class="p-8 rounded-t-lg w-56 h-72" src="${
                  data[i].image
                }" alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h3 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${data[
                      i
                    ].title.slice(0, 42)}</h3>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse">
                       ${starCalculator(
                         Math.round(data[i].rating["rate"])
                       ).join("")}
                    </div>
                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">${
                      Math.round(data[i].rating["rate"]) + ".0"
                    }</span>
                </div>
                <div id='btnprice${i}' class="flex items-start justify-between flex-col">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${
                      data[i].price
                    }$</span>
                </div>
            </div>
        </div>

        `;

      wrapper.appendChild(card);
      document.getElementById(`btnprice${i}`).appendChild(btn);
    }
  }
}
