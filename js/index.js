var SiteName = document.getElementById("SiteName");
var SiteLink = document.getElementById("SiteLink");
var TableBody = document.getElementById("tbody");
var alertMessage = document.getElementById("alertMessage");
var SitesContainer;
if (localStorage.getItem("MySite")) {
  SitesContainer = JSON.parse(localStorage.getItem("MySite"));
  DisplayInfo(SitesContainer);
} else {
  SitesContainer = [];
}
function AddInfo() {

  //fix url-link
  var urltest = SiteLink.value;
  var regxtest = /^(ftp|http|https)/;
  if (!regxtest.test(urltest)) {
    SiteLink.value = "https://" + urltest;
  }
  if (ValidSiteLink() == true && ValidSiteName() == true) {
    var SiteLinks = {
      SiteName: SiteName.value,
      SiteLink: SiteLink.value,
    };
    SitesContainer.push(SiteLinks);
    localStorage.setItem("MySite", JSON.stringify(SitesContainer));
    ClearForm();
    DisplayInfo(SitesContainer);
  } else {
    alertMessage.classList.remove("d-none");
  }
}
function closeAlert() {
  alertMessage.classList.add("d-none");
}
function ClearForm() {
  SiteName.value = "";
  SiteLink.value = "";
  SiteLink.classList.remove("is-valid");
  SiteName.classList.remove("is-valid");
}
function DisplayInfo(arr) {
  var container = ``;
  for (var i = 0; i < arr.length; i++) {
    var index = i + 1;
    if (i % 2 == 0) {
      container += `
      <tr>
      <td class="bg-warning-subtle text-center">${index}</td>
      <td class="bg-warning-subtle text-center">${arr[i].SiteName}</td>
      <td class="bg-warning-subtle text-center"><a href="${arr[i].SiteLink}/"  target="_blank" rel="noopener noreferrer"><button class="btn btn-outline-success btn-sm p-2 px-3" onclick="(${i})"><i class="fa-solid fa-eye px-1"></i>Visit</button></a></td>
      <td class="bg-warning-subtle text-center"><button class="btn btn-outline-danger btn-sm p-2 px-3" onclick="DeleteSite(${i})"><i class="fa-solid fa-trash-can px-1"></i>Delete</button></td>
    </tr>`;
    } else {
      container += `
              <tr>
              <td class="text-center">${index}</td>
              <td class="text-center">${arr[i].SiteName}</td>
              <td class="text-center"><a href="${arr[i].SiteLink}/"  target="_blank" rel="noopener noreferrer"><button class="btn btn-outline-success btn-sm p-2 px-3"><i class="fa-solid fa-eye px-1"></i>Visit</button></a></td>
              <td class="text-center"><button class="btn btn-outline-danger btn-sm p-2 px-3" onclick=" DeleteSite(${i})"><i class="fa-solid fa-trash-can px-1"></i>Delete</button></td>
            </tr>`;
    }
  }
  TableBody.innerHTML = container;
}
function DeleteSite(deleteindex) {
  SitesContainer.splice(deleteindex, 1);
  localStorage.setItem("MySite", JSON.stringify(SitesContainer));
  DisplayInfo(SitesContainer);
}
function ValidSiteLink() {
  var url = SiteLink.value;
  var regx = /^(((ftp|http|https):\/\/)|)[a-zA-Z]+\.?([a-z]+|)*\.(com|gov.eg|github.io)/;
  if (url == "") {
    SiteLink.classList.remove("is-invalid");
    SiteLink.classList.remove("is-valid");
    return false;
  } else if (regx.test(url)) {
    SiteLink.classList.add("is-valid");
    SiteLink.classList.remove("is-invalid");
    return true;
  } else {
    SiteLink.classList.add("is-invalid");
    SiteLink.classList.remove("is-valid");
    return false;
  }
}
function ValidSiteName() {
  var name = SiteName.value;
  var regx = /^[A-Z]{1}[a-z]{3,5}(\s?[a-z]{3,5})*$/;
  if (name == "") {
    SiteName.classList.remove("is-invalid");
    SiteName.classList.remove("is-valid");
    return false;
  } else if (regx.test(name)) {
    SiteName.classList.add("is-valid");
    SiteName.classList.remove("is-invalid");
    return true;
  } else {
    SiteName.classList.add("is-invalid");
    SiteName.classList.remove("is-valid");
    return false;
  }
}
