let apiKey = "06de1c55e8094e77a1ec6eb8dbe9e6d7";
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const options = ["general", "entertainment", "health", "science", "sports", "technology"];
let requestURL = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=06de1c55e8094e77a1ec6eb8dbe9e6d7";
let country = "us"; 

// Create cards from data
const generateUI = (articles) => {
    container.innerHTML = ""; 
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
            <div class="news-image-container">
                <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
            </div>
            <div class="news-content">
                <div class="news-title">${item.title}</div>
                <div class="news-description">${item.description || item.content || ""}</div>
                <a href="${item.url}" target="_blank" class="view-button">Read More</a>
            </div>`;
        container.appendChild(card);
    }
};

// News API Call
const getNews = async () => {
    container.innerHTML = "";
    let response = await fetch(requestURL);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return false;
    }
    let data = await response.json();
    generateUI(data.articles);
};

// Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
};

// Options Buttons
const createOptions = () => {
    optionsContainer.innerHTML = "";
    for (let i of options) {
        optionsContainer.innerHTML += `<button class="option ${i == "general" ? "active" : ""}" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
};

// Initialize the news fetching
const init = () => {
    const countryCodeInput = document.getElementById("country-code");
    const fetchNewsButton = document.getElementById("fetch-news");

    fetchNewsButton.addEventListener("click", () => {
        country = countryCodeInput.value.trim() || "us"; 
        requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
        createOptions();
        getNews(); 
    });
};

window.onload = init;

