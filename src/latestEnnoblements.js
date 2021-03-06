import requestCreator from './libs/requestCreator';
import showPopup from './utils/showPopup';
import getCurrentServer from './utils/getCurrentServer';
import formatDate from './utils/formatDate';
import {
  formatTribeURL,
  formatPlayerURL,
  formatVillageURL,
  formatVillageName,
} from './utils/tribalwars';
import { setItem, getItem } from './utils/localStorage';
import loadTranslations from './i18n/latestEnnoblements';

// ==UserScript==
// @name         Latest ennoblements
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/latestEnnoblements.js
// @version      1.0.4
// @description  Show the latest ennoblements
// @author       Kichiyaki http://dawid-wysokinski.pl/ | Icon author *GD*
// @match        *://*/game.php*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const FILTER_FORM_ID = 'sle_form';
const TABLE_ID = 'sle_table';
const CACHE_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_cache';
const FILTERS_LOCAL_STORAGE_KEY = 'kiszkowaty_show_latest_ennoblements_filter';
const ICON_URL = 'https://i.imgur.com/4WP4098.png';
const query = `
    query liveEnnoblements($server: String!) {
      liveEnnoblements(server: $server) {
        newOwner {
          id
          name
          tribe {
            id
            name
            tag
          }
        }
        oldOwner {
          id
          name
          tribe {
            id
            name
            tag
          }
        }
        ennobledAt
        village {
          id
          name
          x
          y
        }
      }
    }
  `;
const DEFAULT_FILTER = {
  newOwner: '',
  newOwnerTribe: '',
  oldOwner: '',
  oldOwnerTribe: '',
};
const translations = loadTranslations();

const loadLatestEnnoblementsFromCache = () => {
  return getItem(CACHE_LOCAL_STORAGE_KEY);
};

const loadFilters = () => {
  return getItem(FILTERS_LOCAL_STORAGE_KEY);
};

const cacheEnnoblements = (data = {}) => {
  setItem(CACHE_LOCAL_STORAGE_KEY, data);
};

const cacheFilters = (data = {}) => {
  setItem(FILTERS_LOCAL_STORAGE_KEY, data);
};

const loadLatestEnnoblements = () => {
  return requestCreator({
    query,
    variables: {
      server: SERVER,
    },
  }).then((data) => {
    cacheEnnoblements(data);
    return new Promise((resolve) => resolve(data));
  });
};

const isValidPlayer = (obj, searchValue) => {
  return obj && obj.name.toLowerCase().includes(searchValue.toLowerCase());
};

const isValidPlayerTribe = (obj, searchValue) => {
  return (
    obj &&
    obj.tribe &&
    (obj.tribe.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      obj.tribe.tag.toLowerCase().includes(searchValue.toLowerCase()))
  );
};

const filterEnnoblements = (
  ennoblements = [],
  { newOwner, newOwnerTribe, oldOwner, oldOwnerTribe } = {}
) => {
  return ennoblements.filter((ennoblement) => {
    if (newOwner && !isValidPlayer(ennoblement.newOwner, newOwner)) {
      return false;
    }
    if (
      newOwnerTribe &&
      !isValidPlayerTribe(ennoblement.newOwner, newOwnerTribe)
    ) {
      return false;
    }
    if (oldOwner && !isValidPlayer(ennoblement.oldOwner, oldOwner)) {
      return false;
    }
    if (
      oldOwnerTribe &&
      !isValidPlayerTribe(ennoblement.oldOwner, oldOwnerTribe)
    ) {
      return false;
    }
    return true;
  });
};

const handleFilterFormSubmit = (e, ennoblements) => {
  e.preventDefault();
  const filters = {
    ...DEFAULT_FILTER,
    newOwner: e.target[0].value,
    newOwnerTribe: e.target[1].value,
    oldOwner: e.target[2].value,
    oldOwnerTribe: e.target[3].value,
  };
  document.querySelector(
    `#${TABLE_ID} tbody`
  ).innerHTML = formatEnnoblementRows(
    filterEnnoblements(ennoblements, filters)
  ).join('');
  cacheFilters(filters);
};

const addEventListeners = (ennoblements = []) => {
  document
    .querySelector('#' + FILTER_FORM_ID)
    .addEventListener('submit', (e) => {
      handleFilterFormSubmit(e, ennoblements);
    });
};

const formatPlayerHTML = (player) => {
  return player && player.name
    ? `<a href="${formatPlayerURL(player.id)}">${player.name}</a> (${
        player.tribe && player.tribe.tag
          ? `<a href="${formatTribeURL(player.tribe.id)}">${
              player.tribe.tag
            }</a>`
          : '-'
      })`
    : '-';
};

const formatVillageHTML = (village) => {
  return `<a href="${formatVillageURL(village.id)}">${formatVillageName(
    village.name,
    village.x,
    village.y
  )}</a>`;
};

const formatEnnoblementRows = (ennoblements) => {
  return ennoblements.reverse().map((ennoblement) => {
    return `<tr>
              <td>${formatVillageHTML(ennoblement.village)}</td>
              <td>${formatPlayerHTML(ennoblement.newOwner)}</td>
              <td>${formatPlayerHTML(ennoblement.oldOwner)}</td>
              <td>${formatDate(ennoblement.ennobledAt)}</td>
            </tr>`;
  });
};

const renderLatestEnnoblements = (ennoblements = [], filters = {}) => {
  const prepared = {
    ...DEFAULT_FILTER,
    ...filters,
  };
  const html = `
        <form style="margin-bottom: 15px" id="${FILTER_FORM_ID}">
          <h3 style="margin-bottom: 5px">${translations.filters}</h3>
          <input type="text" placeholder="${translations.newOwner}" value="${
    prepared.newOwner
  }" />
          <input type="text" placeholder="${
            translations.newOwnerTribe
          }" value="${prepared.newOwnerTribe}" />
          <input type="text" placeholder="${translations.oldOwner}" value="${
    prepared.oldOwner
  }" />
          <input type="text" placeholder="${
            translations.oldOwnerTribe
          }" value="${prepared.oldOwnerTribe}" />
          <div>
            <button type="submit">${translations.apply}</button>
          </div>
        </form>
        <table class="vis" id="${TABLE_ID}" style="width: 100%">
          <thead>
            <tr>
              <th>${translations.village}</th>
              <th>${translations.newOwner}</th>
              <th>${translations.oldOwner}</th>
              <th>${translations.date}</th>
            </tr>
          </thead>
          <tbody>
            ${formatEnnoblementRows(
              filterEnnoblements(ennoblements, prepared)
            ).join('')}
          </tbody>
        </table>
        `;

  showPopup({
    e: { clientY: 60 },
    title: translations.ennoblements,
    id: 'ennoblements',
    html,
  });

  addEventListeners(ennoblements);
};

const handleButtonClick = async () => {
  try {
    const cache = loadLatestEnnoblementsFromCache();
    const filters = loadFilters();
    if (
      Array.isArray(cache.liveEnnoblements) &&
      cache.liveEnnoblements.length > 0
    ) {
      renderLatestEnnoblements(cache.liveEnnoblements, filters);
    }
    const { liveEnnoblements } = await loadLatestEnnoblements();
    renderLatestEnnoblements(liveEnnoblements, filters);
  } catch (error) {
    console.log('latestEnnoblements', error);
  }
};

const renderButton = () => {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = '5px';
  container.style.left = '4px';
  container.style.zIndex = '50000';

  const button = document.createElement('a');
  button.innerHTML = `<img src="${ICON_URL}">`;
  button.title = translations.showLatestEnnoblements;
  button.style.cursor = 'pointer';
  button.addEventListener('click', handleButtonClick);
  container.append(button);

  document.body.appendChild(container);
};

(function () {
  renderButton();
})();
