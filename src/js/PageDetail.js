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

          let articleDOM = document.querySelector(".page-detail .article");
          let { name, released, description, background_image, developers, genres, tags, clip, rating, ratings_count, website, metacritic_platforms, stores, id} = response;

          articleDOM.querySelector("h1.title").innerHTML = name;
          articleDOM.querySelector("img").src = background_image;
          articleDOM.querySelector("#detail-info > a").href = website
          articleDOM.querySelector("#detail-info > a").innerHTML = website;
          articleDOM.querySelector("p.description").innerHTML = description;
          articleDOM.querySelector("#detail-trailer > video").src = clip.clip
          articleDOM.querySelector("p.rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
          articleDOM.querySelector("#detail-info > div.detail-bottom > div:nth-child(4) > div").innerHTML = released;
          articleDOM.querySelector("#detail-info > div.detail-bottom > div:nth-child(1) > div").innerHTML = developers[0].name;
          articleDOM.querySelector("#detail-youtube").innerHTML += `<iframe id="detailvideo" width="420" height="315" src = https://www.youtube.com/embed/${clip.video}></iframe>`

          fetch(`https://api.rawg.io/api/games/${id}/screenshots?&page_size=6`)
            .then((response) => response.json())
            .then((response) => {
              response.results.forEach((screenshot) => {
                let newScreen = document.createElement("IMG"); 
                newScreen.src = screenshot.image
                document.querySelector("#detail-screenshots").appendChild(newScreen)
              })
            });
          
            stores.forEach((store) => {
                 let newLink = document.createElement("a"); 
                 newLink.innerHTML = store.store.name
                 newLink.href = store.url
                 document.querySelector("#detail-buy").appendChild(newLink)
            })

            genres.forEach((genre) => {
              articleDOM.querySelector("p.genres").innerHTML += genre.name + "/";
            })

            tags.forEach((tag) => {
              document.querySelector("#tags").innerHTML += tag.name 
            })

            metacritic_platforms.forEach((platform) => {
              let string = platform.platform.name + ":   " + platform.metascore + "<br>"
              document.querySelector("#detail-info > div.detail-bottom > div:nth-child(2) > div").innerHTML += string
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
                                          <a href="" class="website"></a>
                                          <div class="detail-bottom">
                                              <div class="collection">
                                                  <h4>Developers</h4>
                                                  <div class="developers"></div>
                                              </div>
                                              <div class="collection">
                                                  <h4>Platforms</h4>
                                                  <div class="platform"></div>
                                              </div>
                                              <div class="collection">
                                                  <h4>Tags</h4>
                                                  <div id="tags"></div>
                                              </div>
                                              <div class="collection">
                                                  <h4>Realease</h4>
                                                  <div class="release-date"></div>
                                              </div>
                                          </div>
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
                                      <div>
                                          <h2>SIMILAR GAMES</h2>
                                          <div></div>
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