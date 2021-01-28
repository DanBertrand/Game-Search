import '../sass/style.scss';

import PageList   from './PageList';
import Home       from './Home';
import PageDetail from './PageDetail';
import routes     from './routes';


let pageArgument;

const setRoute = () => {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
};

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());


const searchBar = document.getElementById("search-bar")

searchBar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        Home(searchBar.value)
    }
});

