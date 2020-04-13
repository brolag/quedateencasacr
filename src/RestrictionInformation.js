import { LitElement, html, css } from 'lit-element';
import { getRestrictionInfo } from './helpers/getRestrictionInformation.js';

export class RestrictionInformation extends LitElement {
  static get properties() {
    return {
      plateNumber: { type: Number },
    };
  }

  static get styles() {
    return css`
      h5 {
        margin: 15px;
      }
      ul {
        margin: 15px;
      }
      ul.day-list {
        display: flex;
        flex-flow: row;
        justify-content: center;
      }
      .restriction-information {
        display: flex;
        flex-flow: column;
        justify-content: center;
      }
      .restriction-schedule {
        border-bottom: 2px dashed gray;
      }
      .restriction-schedule ul {
        list-style: none;
        padding: 0px;
      }
      .green {
        color: green;
      }
      .orange {
        color: orange;
      }
      .red {
        color: red;
      }
      .day-item {
        padding: 15px;
        margin: 15px
        border: 1px solid;
      }
    `;
  }

  render() {
    const restrictionInfo = getRestrictionInfo(this.plateNumber);
    return this.plateNumber !== null && restrictionInfo
      ? html`
          <div class="restriction-information">
            <h3>Resumen sobre la restricción de tu placa</h3>
            <div class="restriction-schedule green">
              <h5>✅Podes circular de 5:00 am a 7:00 pm</h5>
              <ul class="day-list">
                ${restrictionInfo ? restrictionInfo.noRestriction.map(
                  day =>
                    html`
                      <li class="day-item">${day}</li>
                    `,
                ) : ''}
              </ul>
            </div>

            <div class="restriction-schedule orange">
              <h5>⚠️ Solamente alimentos y medicinas</h5>
              <ul class="day-list">
                ${restrictionInfo ? restrictionInfo.regular.map(
                  day =>
                    html`
                      <li class="day-item">${day}</li>
                    `,
                ): ''}
              </ul>
            </div>

            <div class="restriction-schedule red">
              <h5>🚫Restricción total</h5>
              <ul class="day-list">
                ${restrictionInfo ? restrictionInfo.full.map(
                  day =>
                    html`
                      <li class="day-item">${day}</li>
                    `,
                ): ''}
              </ul>
            </div>
          </div>
        `
      : '';
  }
}
