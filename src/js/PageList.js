const PageList = (argument = "") => {
  const preparePage = () => {
    cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";
    const pageSize = "&page_size=9";
    const futureDates = `?dates=${new Date().toISOString().slice(0,10)},${datePlusTenYears()}`;
    const button = document.getElementById("button")
    let finalURL;
    let displayMore = 0

    button.style.display = "block"

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + "?search=" + argument;
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            
            articles += `
                  <div class="cardGame">
                   <a href = "#pagedetail/${article.id}">${article.id}</a>
                    <div>
                      <h1>${article.name}</h1>
                      <h2>${article.released}</h2>
                      
                      <img src="${article.background_image}">
                    </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles">...loading</div>
      </section>
    `;

    preparePage();
  };

  render();
};


export default PageList;
