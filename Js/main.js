let apiKey = "06de1c55e8094e77a1ec6eb8dbe9e6d7";
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const options = ["general", "entertainment", "health", "science", "sports", "technology"];
let requestURL;
let country = "us"; 
// Create cards from data
const generateUI = (articles) => {
    container.innerHTML = "";
    for (let item of articles) {
        let card = document.createElement("div");
        card.classList.add("news-card");
        card.innerHTML = `
            <div class="news-image-container">
                <img src="${item.urlToImage || "./assets/newspaper.jpg"}" alt="" />
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
    try {
        let response = await fetch(requestURL, {
            headers: {
                'Accept': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        let data = await response.json();
        generateUI(data.articles);
    } catch (error) {
        alert("Data unavailable at the moment. Please try again later. Error: " + error.message);
    }
};

// Category Selection
const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    options.forEach((element) => {
        element.classList.remove("active");
    });
    requestURL = `http://localhost:3000/news?country=${country}&category=${category}`;
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
        requestURL = `http://localhost:3000/news?country=${country}&category=general`;
        createOptions();
        getNews(); 
    });
};

window.onload = init;
