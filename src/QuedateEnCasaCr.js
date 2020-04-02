import { LitElement, html, css } from 'lit-element';
import { openWcLogo } from './open-wc-logo.js';
import { calculateRestriction } from './helpers/calculateRestriction.js'

export class QuedateEnCasaCr extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      showRestriction: {type: Boolean}
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
      }

      .logo > svg {
        margin-top: 36px;
        animation: app-logo-spin infinite 20s linear;
      }

      @keyframes app-logo-spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .container {
        padding: 15px;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }

      .myButton {
        box-shadow:inset 0px 1px 0px 0px #ffffff;
        background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
        background-color:#ededed;
        border-radius:6px;
        border:1px solid #dcdcdc;
        display:inline-block;
        cursor:pointer;
        color:#777777;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:6px 24px;
        text-decoration:none;
        text-shadow:0px 1px 0px #ffffff;
        margin: 3px;
      }
      .myButton:hover {
        background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
        background-color:#dfdfdf;
      }
      .myButton:active {
        position:relative;
        top:1px;
      }
      
      .button-box {
        margin-bottom: 25px;
      }

      .restriction-box {
        border: 5px dashed;
        padding: 15px;
        margin: 3px;
      }

      .green {
        border-color: green;
        color: green;
      }

      .orange {
        border-color: orange;
        color: orange;
      }

      .red {
        border-color: red;
        color: red;
      }
    `;
  }

  _calculateRestriction(date, plateNumber) {
    this.showRestriction = true
    this.isRestricted = calculateRestriction(date, plateNumber);
  }

  _isEmergencyDate(date) {
    return date.getMonth() === 4 &&
           date.getDate() >= 8 &&
           date.getDate() <= 12;
  }

  render() {
    const plates = [1,2,3,4,5,6,7,8,9,0];
    const date = new Date();

    return html`
      <main>
        <div class="container">
          <div class="logo">${openWcLogo}</div>
          <h2>¿Tengo restricción?</h2>

          <div class="button-box">
            <h3>Mi placa termina en:</h3>
            ${plates.map(plateNumber => html`
              <button class="myButton" @click=${() => this._calculateRestriction(date, plateNumber)}>${plateNumber}</button>
            `)}
          </div>
          ${
            (this.showRestriction) ?
            (this._isEmergencyDate(date)) ? (
            this.isRestricted ? 
              html`<div class="restriction-box red">
                    SI, QUEDATE EN CASA.
                  </div>` :
              html`<div class="restriction-box orange">
                    PODES SALIR SOLO A COMPRAR COMIDA O MEDICINAS.
                  </div>`) : 
              html`<div class="restriction-box green">
                    PODES USAR TU VEHÍCULO SI ES NECESARIO PERO <br/> <strong>TRATÁ
                    DE QUEDARTE EN CASA</strong>.
                  </div>` :
              ''
          }
        </div>    
      </main>

      <p class="app-footer">
        ❤️ 🇨🇷 Hecho con amor por
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/brolag">@brolag</a>.
      </p>
    `;
  }
}
