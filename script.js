document.addEventListener("DOMContentLoaded", function () {
  let pasteButton = document.getElementById("button");
  pasteButton.addEventListener("click", function () {
    navigator.clipboard.readText().then(
      (cliptext) =>
        (document.getElementById("videoSearchBar").value = cliptext),
      (err) => console.log(err)
    );
  });
});

function checkUrl() {
  var url = document.getElementById("videoSearchBar").value;
  if (url != undefined || url != "") {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      console.log(match[2]);
      yt(url);
    } else {
      console.log("Triggere");
      if (
        url.includes("https://fb.watch/") ||
        url.includes("https://www.facebook.com/reel/")
      ) {
        fb(url);
      } else {
        console.log("Invalid URL provided");
      }
    }
  }
}

async function yt(Url) {
  var url = Url;
  const options = {
    method: "GET",
    headers: {
      "access-control-allow-origin": "*",
      "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
      "X-RapidAPI-Host":
        "fastest-social-video-and-image-downloader.p.rapidapi.com",
    },
  };

  if (url.includes("?list")) {
    document.getElementById("Errortxt").innerHTML = "Playlist not supported";
  } else if (url.at(url.length - 12) != "=" || url.at(url.length - 12) != "/") {
    document.getElementById("Errortxt").innerHTML = "Invalid Video URL";
  }

  let res = await fetch(
    `https://fastest-social-video-and-image-downloader.p.rapidapi.com/youtube?url=${url}`,
    options
  );
  let Data = await res.json();
  if (Data.success === "false") {
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var errorid = document.getElementById("ErrorVideo");
    errorid.style.display = "flex";
    var element = document.querySelector(".DownloadSection");
    element.style.display = "none";
    document.getElementById("down").href = "#ErrorVideo";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    // document.getElementsByClassName("downloadSection");
    // var element = document.querySelector(".downloadSection");
    // element.style.display = "none";
  } else {
    console.log(Data);
    window.open(Data.thumbnail);
    document.getElementById("down").href = "#Downloadsection";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var loaderid = document.getElementById("ErrorVideo");
    loaderid.style.display = "none";
    document.querySelector(".title").innerHTML =
      Data.title == "" ? "Untitled Video" : Data.title;
    document.querySelector(".responseThumbnail").src = Data.thumbnail;
    document.querySelector(".author1").innerHTML = "By Youtube";
    document.querySelector(".quality1").innerHTML = "Download 360P";
    document.querySelector(".size1").innerHTML = "Auto";
    document.querySelector(".qualityBtnbox1").href = Data.data["360p"];
    document.querySelector(".quality2").innerHTML = "Download 720P";
    document.querySelector(".size2").innerHTML = "Auto";
    document.querySelector(".qualityBtnbox2").href = Data.data["720p"];
    // document.querySelector(".quality3").innerHTML =
    //   "Download " + Data.link[22][3];
    // document.querySelector(".size3").innerHTML =
    //   Data.link[22][1] == "" ? "Auto" : Data.link[22][1];
    // document.querySelector(".qualityBtnbox3").href = Data.link[22][0];
    var element = document.querySelector(".DownloadSection");
    element.style.display = "flex";
    var hidebtn = document.getElementById("btn3");
    hidebtn.style.display = "none";
  }
}

async function fb(Url) {
  var url = Url;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "435ec0b7bfmshbf41945eb7fd82cp173a04jsnd5c26f1cb59a",
      "X-RapidAPI-Host": "facebook-reel-and-video-downloader.p.rapidapi.com",
    },
  };

  let res = await fetch(
    `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${url}`,
    options
  );
  let Data = await res.json();
  if (Data.success == "Fail") {
    console.log("Failed");
  }
  if (Data.status === "fail") {
    var loaderid = document.getElementById("preloader");
    loaderid.style.display = "none";
    var errorid = document.getElementById("ErrorVideo");
    errorid.style.display = "flex";
    var element = document.querySelector(".DownloadSection");
    element.style.display = "none";
    document.getElementById("down").href = "#ErrorVideo";
    var clickbtn = document.getElementById("down");
    clickbtn.click();
  } else {
    if (Data.success == false) {
      var loaderid = document.getElementById("preloader");
      loaderid.style.display = "none";
      var errorid = document.getElementById("ErrorVideo");
      errorid.style.display = "flex";
      var element = document.querySelector(".DownloadSection");
      element.style.display = "none";
      document.getElementById("down").href = "#ErrorVideo";
      var clickbtn = document.getElementById("down");
      clickbtn.click();
    } else {
      document.getElementById("down").href = "#Downloadsection";
      var clickbtn = document.getElementById("down");
      clickbtn.click();
      var loaderid = document.getElementById("preloader");
      loaderid.style.display = "none";
      var loaderid = document.getElementById("ErrorVideo");
      loaderid.style.display = "none";
      var element = document.querySelector(".DownloadSection");
      element.style.display = "flex";
      document.querySelector(".title").innerHTML =
        Data.title == "" ? "Untitled Video" : Data.title;
      document.querySelector(".responseThumbnail").src = Data.thumbnail;
      document.querySelector(".author1").innerHTML = "By Facebook User";
      document.querySelector(".quality1").innerHTML = "Download High Quality";
      document.querySelector(".size1").innerHTML = "Auto";
      document.querySelector(".qualityBtnbox1").href =
        Data.links["Download High Quality"];
      document.querySelector(".quality2").innerHTML = "Download Low Quality";
      document.querySelector(".size2").innerHTML = "Auto";
      document.querySelector(".qualityBtnbox2").href =
        Data.links["Download Low Quality"];
      var hidebtn = document.getElementById("btn3");
      hidebtn.style.display = "none";
    }
  }
}
