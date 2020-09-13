import Cookies from "js-cookie";
import api from "./";

const languages = ["en", "fr", "es", "pt", "kr"];
const regions = [
  "euw",
  "kr",
  "jp",
  "na",
  "eune",
  "oce",
  "br",
  "las",
  "lan",
  "ru",
  "tr",
];

export const updateLanguageCookie = (lang) => {
  const cLang = Cookies.get("Language");

  // Checks valid language
  if (languages.includes(lang)) {
    if (cLang !== lang) {
      Cookies.set("Language", lang);
    }
    return "correct";
  } else {
    if (cLang !== undefined) {
      return cLang;
    } else {
      Cookies.set("Language", "en");
      return "en";
    }
  }
};

export const updateRegionCookie = (region) => {
  // Checks valid region
  const cRegion = Cookies.get("Region");

  if (regions.includes(region)) {
    if (cRegion !== region) {
      Cookies.set("Region", region);
    }
    return "correct";
  } else {
    if (cRegion !== undefined) {
      return cRegion;
    } else {
      Cookies.set("Region", "euw");
      return "euw";
    }
  }
};

export const updateHeaderCookies = (lang, region) => {
  const up1Status = updateLanguageCookie(lang);
  const up2Status = updateRegionCookie(region);

  if (up1Status === "correct" && up2Status === "correct") {
    return { status: true };
  } else if (up1Status === "correct") {
    return {
      status: false,
      lang: lang,
      region: up2Status,
    };
  } else if (up2Status === "correct") {
    return {
      status: false,
      lang: up1Status,
      region: region,
    };
  } else {
    return {
      status: false,
      lang: up1Status,
      region: up2Status,
    };
  }
};

export const createNewUser = async () => {
  const res = await api.insertUser();

  if (res.data.success) {
    console.log(res.data.message);
    Cookies.set("UID", res.data.id.toString());

    return res.data.id.toString();
  }
  return "";
};

const getRecentSearches = () => {
  const recent = Cookies.get("recentSearches");
  const favorite = Cookies.get("favoriteSearches");

  let ret = [];

  if (recent !== undefined && recent !== "") {
    const splited = recent.split("%24");
    for (let i = 0; i < splited.length; i++) {
      ret.push({
        summoner: decodeURI(splited[i]),
        isFavorite:
          favorite === undefined ? false : favorite.includes(splited[i]),
      });
    }
  }

  return ret;
};

const getFavoriteSearches = () => {
  const favorite = Cookies.get("favoriteSearches");

  let ret = [];
  if (favorite !== undefined) {
    const splited = favorite.split("%24");

    for (let i = 0; i < splited.length; i++) {
      ret.push({ summoner: decodeURI(splited[i]) });
    }
  }
  return ret;
};

const saveSearchesCookies = (isFavorite, searchArr) => {
  let search = "";

  for (let i = 0; i < searchArr.length; i++) {
    search +=
      encodeURI(searchArr[i].summoner) +
      (i < searchArr.length - 1 ? "%24" : "");
  }

  if (isFavorite) Cookies.set("favoriteSearches", search);
  else Cookies.set("recentSearches", search);
};

export const getSummonerSearches = () => {
  return {
    searches: getRecentSearches(),
    favorites: getFavoriteSearches(),
  };
};

export const removeSummonerSearch = (isFavorite, name) => {
  if (isFavorite) {
    var favorites = getFavoriteSearches();
    favorites = favorites.filter((fav) => fav.summoner !== name);
    saveSearchesCookies(isFavorite, favorites);

    return {
      searches: getRecentSearches(),
      favorites: favorites,
    };
  } else {
    var recents = getRecentSearches();
    recents = recents.filter((rec) => rec.summoner !== name);
    saveSearchesCookies(isFavorite, recents);

    return {
      searches: recents,
      favorites: getFavoriteSearches(),
    };
  }
};

export const addSummonerSearch = (name) => {
  var recents = getRecentSearches();
  recents = recents.filter((rec) => rec.summoner !== name);
  recents.unshift({ summoner: name, isFavorite: false });
  if (recents.length >= 10) recents = recents.slice(0, 9);

  saveSearchesCookies(false, recents);

  return {
    searches: recents,
    favorites: getFavoriteSearches(),
  };
};

export const toggleFavorite = (name, isFavorite) => {
  var favorites = getFavoriteSearches();

  if (isFavorite) {
    favorites = favorites.filter((fav) => fav.summoner !== name);
  } else {
    favorites.unshift({ summoner: name });
  }

  saveSearchesCookies(true, favorites);

  return {
    searches: getRecentSearches(),
    favorites: favorites,
  };
};

const cookiesApi = {
  updateLanguageCookie,
  updateRegionCookie,
  updateHeaderCookies,
  createNewUser,
  getSummonerSearches,
  removeSummonerSearch,
  addSummonerSearch,
  toggleFavorite,
};

export default cookiesApi;
