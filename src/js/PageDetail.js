const PageDetail = (argument) => {
  const preparePage = () => {
   const cleanedArgument = argument.replace(/\s+/g, "-");
   document.getElementById("intro").style.display = 'none'
   document.getElementById("button-show-more").style.display = 'none'


    const fetchGame = (url, argument) => {
      let finalURL = url + argument;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {

 
          console.log(response)
          let { name, released, description, background_image, developers, genres, tags, clip, rating, website, metacritic_platforms} = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("img").src = background_image;
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("p.developers").innerHTML = developers[0].name;
          articleDOM.querySelector("p.rating").innerHTML = rating;
          document.querySelector("#detail-info > a").innerHTML = response.website ;
          document.querySelector("#detail-info > a").href = response.website
          document.querySelector("#detail-trailer > video").src = clip.clip
          
          genres.forEach((genre) => {
            articleDOM.querySelector("p.genres").innerHTML += genre.name + "/";
          })

          tags.forEach((tag) => {
            articleDOM.querySelector("p.tags").innerHTML += tag.name + "/";
          })

          response.stores.forEach((store) => {
               let newLink = document.createElement("a"); 
               newLink.innerHTML = store.store.name
               newLink.href = store.url
               document.querySelector("#detail-buy").appendChild(newLink)
          })

          fetch(`https://api.rawg.io/api/games/${response.id}/screenshots?&page_size=9`)
            .then((response) => response.json())
            .then((response) => {
          response.results.forEach((screenshot) => {
          let newScreen = document.createElement("IMG"); 
          newScreen.src = screenshot.image
          document.querySelector("#detail-screenshots").appendChild(newScreen)
          })
            });


          fetch(`https://api.rawg.io/api/games/${response.id}/suggested?&page_size=9`)
            .then((response) => response.json())
            .then((response) => {
          response.results.forEach((game) => {

            console.log("******************************")
            console.log(game)
            console.log("******************************")

            document.querySelector("#detail-similar-games").innerHTML += `
                  
                  <div class="cardGame">

                    <div class="content">
                    <a href="#pagedetail/${game.id}"></a>
                      <div class="image-list">
                        <img  src="${game.background_image}">
                      </div>

                      <div class="bottom-content">
                      <h1>${game.name}</h1>

                 
                     
                     </div>
                    </div>

                    <div class="more">
                          <h2>${game.released}</h2>
                          <h3>${rating.join("")}</h3>
                          <h3>${category}</h3>
                    </div>
                  </div>
                `;

          })
            });


          metacritic_platforms.forEach((platform) => {
            let string = platform.platform.name + ":   " + platform.metascore + "<br>"
            articleDOM.querySelector("p.platform").innerHTML += string
          })
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">

        <div id="detail-image">
          <img src="">
        </div>

        <div id="detail-info">
          <h1 class="title"></h1>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
          <p class="developers"></p>
          <p class="genres"></p>
          <p class="rating"></p>
          <p class="platform"></p>
          <p class="tags"></p>
          <a href="" class="website"></a>
        </div>
        
        <div id="detail-buy">
          <h2>BUY</h2>
        </div>

        <div id="detail-trailer">
          <h2>TRAILER</h2>
          <video src="" controls></video>
        </div>

        <div>
          <h2>SCREENSHOTS</h2>
          <div id="detail-screenshots"></div>
        </div>

        <div id="detail-youtube">
          <h2>YOUTUBE</h2>
        </div>

        <div >
          <h2>SIMILAR GAMES</h2>
          <div id="detail-similar-games" ></div>
        </div>

          <p class="clip"></p>

          



        </div>
      </section>


    `;

    preparePage();
  };

  render();
};



export default PageDetail;