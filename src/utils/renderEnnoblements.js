import { generatePaginationItems, getContainerStyles } from './pagination';
import renderPopup from './renderPopup';
import formatDate from './formatDate';
import {
  formatTribeURL,
  formatPlayerURL as formatPlayerURLTribalWars,
  formatVillageName,
  formatVillageURL,
} from './tribalwars';

const ENNOBLEMENTS_PAGINATION_CONTAINER_ID = 'ennoblementsPagination';

const getPlayerTd = (player, tribe) => {
  if (player) {
    return `<td><a href="${formatPlayerURLTribalWars(player.id)}">${
      player.name
    } (${
      tribe ? `<a href="${formatTribeURL(tribe.id)}">${tribe.tag}</a>` : '-'
    })</a></td>`;
  }
  return '<td>-</td>';
};

export default (
  e,
  ennoblements,
  { limit = 0, currentPage = 1, onPageChange = () => {} } = {}
) => {
  const paginationItems = generatePaginationItems({
    total: ennoblements.total,
    limit,
    currentPage,
  });
  const html = `
    <div style="${getContainerStyles()}" id="${ENNOBLEMENTS_PAGINATION_CONTAINER_ID}">
      ${paginationItems.join('')}
    </div>
    <table class="vis" style="border-collapse: separate; border-spacing: 2px; width: 100%;">
      <tbody>
        <tr>
          <th>
            Date
          </th>
          <th>
            Village
          </th>
          <th>
            New Owner
          </th>
          <th>
            Old Owner
          </th>
        </tr>
        ${ennoblements.items
          .map((ennoblement) => {
            let rowHTML =
              '<tr>' + `<td>${formatDate(ennoblement.ennobledAt)}</td>`;
            if (ennoblement.village) {
              rowHTML += `<td><a href="${formatVillageURL(
                ennoblement.village.id
              )}">${formatVillageName(
                ennoblement.village.name,
                ennoblement.village.x,
                ennoblement.village.y
              )}</a></td>`;
            } else {
              rowHTML += '<td>-</td>';
            }

            rowHTML += getPlayerTd(
              ennoblement.newOwner,
              ennoblement.newOwnerTribe
            );
            rowHTML += getPlayerTd(
              ennoblement.oldOwner,
              ennoblement.oldOwnerTribe
            );

            return rowHTML + '</tr>';
          })
          .join('')}
      </tbody>
    </table>
  `;

  renderPopup({
    e,
    title: `Ennoblements`,
    id: 'ennoblements',
    html,
  });

  document
    .querySelectorAll('#' + ENNOBLEMENTS_PAGINATION_CONTAINER_ID + ' a')
    .forEach((el) => {
      el.addEventListener('click', onPageChange);
    });
};