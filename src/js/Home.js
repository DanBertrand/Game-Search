const Home = (argument = "") => {


    const preparePage = () => {

      const cleanedArgument = argument.replace(/\s+/g, "-");
      let articles = "";
      const pageSize = "&page_size=9";
      const futureDates = `?dates=${new Date().toISOString().slice(0,10)},${datePlusTenYears()}`;

      const fetchList = (url, argument) => {

        let finalURL = url + "?search=" + cleanedArgument + pageSize;
        console.log("Argument", argument)

        if (!argument) {
          finalURL = url + futureDates + pageSize;
          console.log("COUCOU")
        }

        if (argument === "NEXT") {
          finalURL = url;
        }



        fetch(`${finalURL}`)
          .then((response) => response.json())
          .then((response) => {
            response.results.forEach((article) => {
              articles += `
                    <div class="cardGame">
                      <h1>${article.name}</h1>
                      <h2>${article.released}</h2>
                      <a href = "#pagedetail/${article.id}">More</a>
                    </div>
                  `;
            });

            document.querySelector(".page-list .articles").innerHTML = articles;


            let button = document.getElementById("button")

            const newFetch = () => {
              button.removeEventListener("click", newFetch)
              fetchList(response.next, "NEXT")
            }

           
            button.addEventListener("click", newFetch)

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

const datePlusTenYears = () => {
    const date = new Date()
    const year = date.getFullYear()+10;
    const dateNoYear = date.toISOString().slice(4,10);
    return year.toString().concat(dateNoYear)
  
}

export default Home;