import isURL from 'validator/lib/isURL';
import requestCreator from './libs/requestCreator';
import renderTodaysStats from './utils/renderTodaysStats';
import getIDFromURL from './utils/getIDFromURL';
import getCurrentServer from './utils/getCurrentServer';
import { setItem, getItem } from './utils/localStorage';
import formatDate from './utils/formatDate';
import { formatPlayerURL } from './utils/twstats';

// ==UserScript==
// @name         Extended Tribe Profile
// @namespace    https://github.com/tribalwarshelp/scripts
// @updateURL    https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @downloadURL  https://raw.githubusercontent.com/tribalwarshelp/scripts/master/dist/extendedTribeProfile.js
// @version      0.3.1
// @description  Extended Tribe Profile
// @author       Kichiyaki http://dawid-wysokinski.pl/
// @match        *://*/game.php*&screen=info_ally*
// @grant        none
// @run-at       document-end
// ==/UserScript==

const SERVER = getCurrentServer();
const TRIBE_ID = getIDFromURL(window.location.search);
const LOCAL_STORAGE_KEY = 'kichiyaki_extended_tribe_profile' + TRIBE_ID;
const TRIBE_QUERY = `
    query tribe($server: String!, $id: Int!, $playerFilter: PlayerFilter!, $dailyTribeStatsFilter: DailyTribeStatsFilter!) {
        tribe(server: $server, id: $id) {
            id
            bestRank
            bestRankAt
            mostPoints
            mostPointsAt
            mostVillages
            mostVillagesAt
            createdAt
            dominance
        }
        dailyTribeStats(server: $server, filter: $dailyTribeStatsFilter) {
          items {
            rank
            rankAtt
            rankDef
            rankTotal
            points
            scoreAtt
            scoreAtt
            scoreDef
            scoreTotal
            villages
          }
        }
        players(server: $server, filter: $playerFilter) {
          items {
            id
            rankAtt
            rankDef
            rankSup
            rankTotal
            scoreAtt
            scoreAtt
            scoreDef
            scoreSup
            scoreTotal
            dailyGrowth
          }
        }
    }
`;
const profileInfoTBody = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(1) > table > tbody'
);
const otherElementsContainer = document.querySelector(
  '#content_value > table:nth-child(3) > tbody > tr > td:nth-child(2)'
);
const membersContainer = document.querySelector(
  '#content_value > table.vis > tbody'
);

const loadDataFromCache = () => {
  return getItem(LOCAL_STORAGE_KEY);
};

const cacheTribeData = (data = {}) => {
  setItem(LOCAL_STORAGE_KEY, data);
};

const getMembersIDs = () => {
  const ids = [];
  membersContainer.querySelectorAll('a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href.includes('info_player')) {
      ids.push(getIDFromURL(href));
    }
  });
  return ids;
};

const loadData = async () => {
  const membersIDs = getMembersIDs();
  const data = await requestCreator({
    query: TRIBE_QUERY,
    variables: {
      server: SERVER,
      id: TRIBE_ID,
      dailyTribeStatsFilter: {
        sort: 'createDate DESC',
        limit: 1,
        tribeID: [TRIBE_ID],
      },
      playerFilter: {
        sort: 'rank ASC',
        limit: membersIDs.length,
        id: membersIDs,
      },
    },
  });
  cacheTribeData(data);
  return data;
};

const renderTr = ({ title, data, id }) => {
  let tr = document.querySelector('#' + id);
  if (!tr) {
    tr = document.createElement('tr');
    tr.id = id;
    tr.appendChild(document.createElement('td'));
    tr.appendChild(document.createElement('td'));
    profileInfoTBody.append(tr);
  }
  tr.children[0].innerHTML = title;
  tr.children[1].innerHTML = data;
};

const extendMembersData = (players) => {
  membersContainer.parentElement.style.width = '100%';
  const heading = membersContainer.querySelector('tr:first-child');
  if (heading.children.length !== 11) {
    ['ODA', 'ODD', 'ODS', 'OD', 'Daily growth', 'Player links'].forEach((v) => {
      const th = document.createElement('th');
      th.innerHTML = v;
      heading.appendChild(th);
    });
  }
  membersContainer.querySelectorAll('tr').forEach((tr) => {
    const a = tr.querySelector('a');
    if (!a) {
      return;
    }
    const playerID = getIDFromURL(a.getAttribute('href'));
    const player = players.items.find((p) => p.id === playerID);
    if (player) {
      [
        [player.scoreAtt, player.rankAtt],
        [player.scoreDef, player.rankDef],
        [player.scoreSup, player.rankSup],
        [player.scoreTotal, player.rankTotal],
        player.dailyGrowth,
        [formatPlayerURL(SERVER, player.id), 'TWStats'],
      ].forEach((data, index) => {
        let td = tr.children[5 + index];
        if (!td) {
          td = document.createElement('td');
          tr.appendChild(td);
        }
        if (Array.isArray(data)) {
          if (typeof data[0] === 'number') {
            td.innerHTML = `${data[0].toLocaleString()} (<strong>${
              data[1]
            }</strong>)`;
          } else if (isURL(data[0])) {
            td.innerHTML = `<a href="${data[0]}">${data[1]}</a>`;
          }
        } else if (typeof data === 'number') {
          td.innerHTML = data.toLocaleString();
        }
      });
    }
  });
};

const render = ({ tribe, dailyTribeStats, players }) => {
  [
    {
      title: 'Created at:',
      data: formatDate(tribe.createdAt),
      id: 'created_at',
    },
    {
      title: 'Dominance:',
      data: tribe.dominance.toFixed(2) + '%',
      id: 'dominance',
    },
    {
      title: 'Best rank:',
      data: tribe.bestRank + ' ' + `(${formatDate(tribe.bestRankAt)})`,
      id: 'best_rank',
    },
    {
      title: 'Most points:',
      data:
        tribe.mostPoints.toLocaleString() +
        ' ' +
        `(${formatDate(tribe.mostPointsAt)})`,
      id: 'most_points',
    },
    {
      title: 'Most villages:',
      data: tribe.mostVillages + ' ' + `(${formatDate(tribe.mostVillagesAt)})`,
      id: 'most_villages',
    },
  ].forEach((data) => {
    renderTr(data);
  });

  if (dailyTribeStats && dailyTribeStats.items.length > 0) {
    renderTodaysStats(otherElementsContainer, dailyTribeStats.items[0]);
  }

  if (players && players.items.length > 0) {
    extendMembersData(players);
  }
};

(async function () {
  try {
    document.querySelector('#content_value > table:nth-child(3)').style.width =
      '100%';

    const dataFromCache = loadDataFromCache();
    if (dataFromCache && dataFromCache.tribe) {
      render(dataFromCache);
    }

    const dataFromAPI = await loadData();
    if (dataFromAPI) {
      render(dataFromAPI);
    }
  } catch (error) {
    console.log('extended tribe profile', error);
  }
})();
