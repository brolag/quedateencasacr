import { LitElement, html, css } from 'lit-element';
import { getRestrictionInfo } from './helpers/getRestrictionInformation';

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
    `;}

  render() {
    const restrictionInfo = getRestrictionInfo(this.plateNumber);
    return this.plateNumber !== null ? html`
    <div class="restriction-information">
      <h3>Resumen sobre la restricción de tu placa</h3>
      <div class="restriction-schedule green">
        <h5>✅Restricción de 5:00 am a 5:00 pm</h5>
        <ul>
          ${restrictionInfo.noRestriction.map(day => html`<li>${day} de Abril</li>`)}
        </ul>
      </div>

      <div class="restriction-schedule orange">
        <h5>⚠️ Solamente alimentos y medicinas</h5>
        <ul>
          ${restrictionInfo.regular.map(day => html`<li>${day} de Abril</li>`)}
        </ul>
      </div>

      <div class="restriction-schedule red">
        <h5>🚫Restricción total</h5>
        <ul>
          ${restrictionInfo.full.map(day => html`<li>${day} de Abril</li>`)}
        </ul>
      </div>
    </div>` : ''
  }
}