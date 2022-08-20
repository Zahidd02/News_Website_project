//Initialize the Country-wise News API parameters
let APIkey = "dff010dbe20a47d8afcf1899673cad75";
var news;
let xhr = new XMLHttpRequest();

//Default News Firing
newsFunction("in");

//Request Parameters for India
function newsFunction(country) {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${APIkey}`;

    xhr.open('GET', url, true);

    xhr.onload = () => {
        if (xhr.status == 200) {
            let result = JSON.parse(xhr.responseText);
            let articles = result.articles;
            news = "";
            for (key in articles) {
                //console.log(articles[key]); //(Just for checking if objects arrive correctly in console)
                key = parseInt(key);
                let content;
                if (articles[key].content != null && articles[key].content != "") {
                    content = `${articles[key].content}`
                }
                else if (articles[key].description != null) {
                    content = `${articles[key].description}`;
                }
                else {
                    continue;
                }
                news += `<div class="accordion-item">
                        <h2 class="accordion-header" id="heading${key}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                            <span><b>Breaking News ${key + 1}:</b> ${articles[key].title}</span>
                        </button>
                        </h2>
                        <div id="collapse${key}" class="accordion-collapse collapse" aria-labelledby="heading${key}" data-bs-parent="#accordionExample">
                        <div class="accordion-body">
                            ${content} <a href = ${articles[key].url} target = "_blank">Read More</a>
                        </div>
                        <div>
                            <img src="${articles[key].urlToImage}" class="img-fluid" style = "margin:20px 0px">
                        </div>
                        </div>
                    </div>`
            }

            document.getElementById("NewsAccordion").innerHTML = news;
        }
        else {
            console.log("Some error occured!");
        }
    };

    xhr.send();
}

//Initialize the Keywords-wise News API parameters
function searchUsingKeywords(keywords) {
    let url = `https://newsapi.org/v2/everything?q=${keywords}&apiKey=${APIkey}`;
    location.reload();
    xhr.open('GET', url, true);

    xhr.onload = () => {
        if (xhr.status == 200) {
            let result = JSON.parse(xhr.responseText);
            let articles = result.articles;
            news = `<h3>Top Search Results</span></h3>
                    <hr>`;
            for (key in articles) {
                //console.log(articles[key]); //(Just for checking if objects arrive correctly in console)
                key = parseInt(key);
                let content;
                if (articles[key].content != null && articles[key].content != "") {
                    content = `${articles[key].content}`
                }
                else if (articles[key].description != null) {
                    content = `${articles[key].description}`;
                }
                else {
                    continue;
                }
                news += `
                        <div class="accordion" id="NewsAccordion">
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading${key}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${key}" aria-expanded="true" aria-controls="collapse${key}">
                                <span><b>Search Result ${key + 1}:</b> ${articles[key].title}</span>
                            </button>
                            </h2>
                            <div id="collapse${key}" class="accordion-collapse collapse" aria-labelledby="heading${key}" data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                ${content} <a href = ${articles[key].url} target = "_blank">Read More</a>
                            </div>
                            <div>
                                <img src="${articles[key].urlToImage}" class="img-fluid" style = "margin:20px 0px">
                            </div>
                            </div>
                        </div>
                        </div>`
            }

            document.getElementById("topSearch").innerHTML = news;
        }
        else {
            console.log("Some error occured!");
        }
    };

    xhr.send();
}
