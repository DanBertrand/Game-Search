const Home = (argument) => {


    const preparePage = () => {

      document.getElementById("intro").style.display = 'block'
      document.getElementById("button-show-more").style.display = 'block'
      const cleanedArgument = argument.replace(/\s+/g, "-");
      let articles = "";
      const pageSize = "&page_size=9";
      const futureDates = `?dates=${new Date().toISOString().slice(0,10)},${datePlusTenYears()}`;
      const button = document.getElementById("button-show-more")
      let finalURL;
      let displayMore = 0

      button.style.display = "block"

      const fetchList = (url, argument) => {

        if(argument === "NEXT") {
          finalURL = url;
          console.log("RE FETCH", finalURL)
        }
        if (argument == ""){
         finalURL  =  url + futureDates + pageSize;
         console.log("ELSE", finalURL)
        }
        if(argument !== "NEXT" && argument !== ""){
          finalURL = url + "?search=" + cleanedArgument + pageSize;
          console.log("FIRST SEARCH", finalURL)
          console.log("Fist input", argument)
        }


        fetch(`${finalURL}`)

          .then((response) => response.json())
          .then((response) => {
            response.results.forEach((article) => {

          const platforms = [];
          const rating = [];
          let category = "Genres: ";

          rating.push(article.rating, "/5", " - ", article.ratings_count, " votes")


          article.parent_platforms.forEach((platform) => {
                platforms.push(platform.platform.name)
          })

          article.genres.forEach((genre) => {
            category += `${genre.name} ` 
          })

          const plateformCLass = (array) => {
              let myClass = "";
              array.forEach((platform) => {
                if (platform == "PC") {
                  myClass += " <div class='PC'></div>"
                }
                if (platform == "PlayStation") {
                  myClass += "<div class='PlayStation'>&nbsp</div>" 
                }
                if (platform == "Xbox") {
                  myClass += " <div class='Xbox'>&nbsp</div>"
                }
                if (platform == "iOS" || platform == "Android") {
                  myClass += "<div class='mobile'>&nbsp</div>"
                }
                if (platform == "Nintendo Switch") {
                  myClass += "<div class='Nintendo'>&nbsp</div>"
                }
                if (platform == "Linux") {
                  myClass += "<div class='Linux'>&nbsp</div>"
                }
              })

              return myClass
          }

              articles += `
                    
                    <div class="cardGame">

                      <div class="content">
                      <a href="#pagedetail/${article.id}"></a>
                        <div class="image-list">
                          <img  src="${article.background_image}">
                        </div>

                        <div class="bottom-content">
                        <h1>${article.name}</h1>

                        <div class="logo" >${plateformCLass(platforms)}</div>
                       
                       </div>
                      </div>

                      <div class="more">
                            <h2>${article.released}</h2>
                            <h3>${rating.join("")}</h3>
                            <h3>${category}</h3>
                      </div>
                    </div>
                  `;
            });


            button.removeEventListener("click", newFetch)

            const newFetch = () => {
              displayMore += 1
              fetchList(response.next, "NEXT")
              button.removeEventListener("click", newFetch)
              if (displayMore == 2) {
                button.style.display = "none"
                button.removeEventListener("click", newFetch)
              }
            }

            document.querySelector(".page-list .articles").innerHTML = articles;
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