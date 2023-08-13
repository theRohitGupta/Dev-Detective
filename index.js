function toggleLD(){
    document.querySelector(".darkMode").classList.toggle("activeBtn");
    document.querySelector(".lightMode").classList.toggle("activeBtn");
    document.querySelector(".wrapper").classList.toggle("wrapperDM");
    document.querySelector(".titleText").classList.toggle("titleTextDM");
    document.querySelector(".searchContainer").classList.toggle("searchContainerDM");
    document.querySelector(".searchTab").classList.toggle("searchTabDM");
    document.querySelector(".searchBar").classList.toggle("searchBarDM");
    document.querySelector(".heroContainer").classList.toggle("heroContainerDM");
    document.querySelector(".heroName").classList.toggle("heroNameDM");
    document.querySelector(".joiningInfo").classList.toggle("joiningInfoDM");
    document.querySelector(".desc").classList.toggle("descDM");
    document.querySelector(".infoBoxes").classList.toggle("infoBoxesDM");    
    const allInfoText = document.querySelectorAll(".infoText");
    allInfoText.forEach((i) => {
        i.classList.toggle("infoTextDM");
    });
    const allInfoCount = document.querySelectorAll(".infoCount");
    allInfoCount.forEach((i) => {
        i.classList.toggle("infoCountDM");
    });
    const allSocialInfoBox = document.querySelectorAll(".socialInfoBox");
    allSocialInfoBox.forEach((i) => {
        i.classList.toggle("socialInfoBoxDM");
    });
}

const searchInput = document.querySelector("[data-searchBar]");
const errorText = document.querySelector(".errorText");
const searchBtn = document.querySelector("[data-searchBtn]");

const heroImg = document.querySelector("[data-heroImg");
const heroName = document.querySelector("[data-heroName");
const heroLink = document.querySelector("[data-heroLink");
const heroJoiningDate = document.querySelector("[data-joiningDate");
const monthData = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
const heroDesc = document.querySelector("[data-desc]");
const repoCount = document.querySelector("[data-repoCount]");
const followerCount = document.querySelector("[data-followerCount]");
const followingCount = document.querySelector("[data-followingCount]");
const locationData = document.querySelector("[data-location]");
const webLinkData = document.querySelector("[data-webLink]");
const twitterIdData = document.querySelector("[data-twitterId]");
const companyData = document.querySelector("[data-company]");

searchInput.addEventListener('click',() => {
    errorText.classList.remove("active");
});
searchBtn.addEventListener('click', () => {
    searchId(searchInput.value);
});

async function searchId(id){
    let res = await fetch(`https://api.github.com/users/${id}`);
    try{
        if(res.status == 404)
            throw err;
    }catch(err){
        errorText.classList.add("active");
        return;
    }
    let data = await res.json();
    // Inputting Values in UI
    heroImg.src = data?.avatar_url;
    heroName.innerText = data?.name;
    heroLink.innerText = `@${data?.login}`;
    heroLink.href = `https://github.com/${data?.login}`;
    let joiningDate = data?.created_at;
    let day = joiningDate.substr(8,2);
    let month = monthData[parseInt(joiningDate.substr(5,2)) - 1];
    let year = joiningDate.substr(0,4);
    heroJoiningDate.innerText = `Joined ${day} ${month} ${year}`;
    heroDesc.innerText = data?.bio;
    repoCount.innerText = data?.public_repos;
    followerCount.innerText = data?.followers;
    followingCount.innerText = data?.following;
    locationData.innerText = data?.location;
    let webLink = data?.blog; 
    webLinkData.innerText = webLink.substr(8);
    webLinkData.href = data?.blog;
    twitterIdData.innerText = data?.twitter_username;
    twitterIdData.href = `https://twitter.com/${data?.twitter_username}`;
    companyData.innerText = data?.company;
}
searchId("RG-CREATOR");