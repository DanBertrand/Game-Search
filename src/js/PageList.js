const PageList = (argument = "") => {
  
  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";
    const pageSize = "&page_size=9"

    const fetchList = (url, argument, pageSize) => {

      let finalURL = url;

      if (argument) {
        finalURL = url + "?search=" + argument + pageSize;
        console.log("Final URL:", finalURL)
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
                  <div class="cardGame">
                    <h1>${article.name}</h1>
                    <h2>${article.released}</h2>
                    <a href = "#pagedetail/${article.id}">${article.id}</a>
                  </div>
                `;
          });
          document.querySelector(".page-list .articles").innerHTML = articles;


          const newFetch = () => {
            fetchList(response.next)
            console.log("response next:", response.next)
          }

          const button = document.getElementById("button").addEventListener("click", newFetch)
          console.log(button)

        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument, pageSize);
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
