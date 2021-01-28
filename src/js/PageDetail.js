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


          console.log("*****************************")
          console.log(response.ratings_count)
          console.log("*****************************")


          let { name, released, description, background_image, developers, genres, tags, clip, rating, ratings_count, website, metacritic_platforms, stores, id} = response;

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("img").src = background_image;
          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("p.release-date span").innerHTML = released;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("p.developers").innerHTML = developers[0].name;
          articleDOM.querySelector("p.rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
          articleDOM.querySelector("#detail-info > a").innerHTML = website ;
          articleDOM.querySelector("#detail-info > a").href = website
          articleDOM.querySelector("#detail-trailer > video").src = clip.clip
          articleDOM.querySelector("#detail-youtube").innerHTML += `<iframe id="detailvideo" width="420" height="315" src = https://www.youtube.com/embed/${clip.video}></iframe>`

          
          genres.forEach((genre) => {
            articleDOM.querySelector("p.genres").innerHTML += genre.name + "/";
          })

          tags.forEach((tag) => {
            articleDOM.querySelector("p.tags").innerHTML += tag.name + "/";
          })

          stores.forEach((store) => {
               let newLink = document.createElement("a"); 
               newLink.innerHTML = store.store.name
               newLink.href = store.url
               document.querySelector("#detail-buy").appendChild(newLink)
          })

          fetch(`https://api.rawg.io/api/games/${id}/screenshots?&page_size=6`)
            .then((response) => response.json())
            .then((response) => {
          response.results.forEach((screenshot) => {
          let newScreen = document.createElement("IMG"); 
          newScreen.src = screenshot.image
          document.querySelector("#detail-screenshots").appendChild(newScreen)
          })
          });











          // fetch(`https://api.rawg.io/api/games/${response.id}/suggested?&page_size=9`)
          //   .then((response) => response.json())
          //   .then((response) => {
          // response.results.forEach((game) => {

          // })
          //   });


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
          <div class="header">
            <h1 class="title"></h1>
            <p class="rating"></p>
          </div>
          <p class="release-date">Release date : <span></span></p>
          <p class="description"></p>
          <p class="developers"></p>
          <p class="genres"></p>
          
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
          <div ></div>
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