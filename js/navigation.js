let MODAL_PATH = './modal';
let NAV_MODAL_PATH = MODAL_PATH + '/navigation.html';

let ERROR_COULD_NOT_LOAD = 'The navigation bar could not be loaded!';

function insert_nav_bar(selector_id, nav_bar_str) {
  // Add the contents of json to #foo:
  document.getElementById(selector_id).innerHTML = nav_bar_str;
}

function loadDoc(error_msg, onLoad) {
  var xhttp = new XMLHttpRequest();
  // Check for the various File API support.
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    // Great success! All the File APIs are supported.
    var rawFile = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
      console.log("Loading Navigation Bar.");
      if (this.readyState == 4 && this.status == 200) {
        onLoad();
      }
    };

    xhttp.onerror = function() {
      console.log("Something went wrong!");
      console.log("Status Code = " + this.status);
    };

    xhttp.open("GET", NAV_MODAL_PATH, true);
    xhttp.send();

  } else {
    alert(error_msg + '\nThe File APIs are not fully supported in this browser.');
  }
}

function _loadDoc(error_msg, onLoad) {
  var z, i, elmnt, file, xhttp;
  /*loop through a collection of all HTML elements:*/
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /*make an HTTP request using the attribute value as the file name:*/
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
          if (this.status == 200) {elmnt.innerHTML = this.responseText;}
          if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
          /*remove the attribute, and call this function once more:*/
          elmnt.removeAttribute("w3-include-html");
          loadDoc(error_msg, onLoad);
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /*exit the function:*/
      return;
    }
  }
}
