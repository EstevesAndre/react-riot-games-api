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
  }
};

const cookiesApi = {
  updateLanguageCookie,
  updateRegionCookie,
  updateHeaderCookies,
  createNewUser,
};

export default cookiesApi;
