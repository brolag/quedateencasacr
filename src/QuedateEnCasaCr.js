import { LitElement, html, css } from 'lit-element';
import { calculateRestriction } from './helpers/calculateRestriction.js';

export class QuedateEnCasaCr extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      page: { type: String },
      showRestriction: {type: Boolean},
      isRestricted: {type: Boolean},
      isEmergency: {type: Boolean},
      maxCirculationHour: {type: Number},
      minCirculationHour: {type: Number},
      plateNumber: {type: Number}
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

      .install-button {
        box-shadow:inset 0px 1px 0px 0px #a4e271;
        background:linear-gradient(to bottom, #89c403 5%, #77a809 100%);
        background-color:#89c403;
        border-radius:6px;
        border:1px solid #74b807;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:6px 24px;
        text-decoration:none;
        text-shadow:0px 1px 0px #528009;
      }
      .install-button:hover {
        background:linear-gradient(to bottom, #77a809 5%, #89c403 100%);
        background-color:#77a809;
      }
      .install-button:active {
        position:relative;
        top:1px;
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
        font-size:23px;
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
    this.showRestriction = true;
    this.isRestricted = calculateRestriction(date.getDay(), plateNumber);
    this.isEmergency = this._isEmergencyDate(date);
    this.maxCirculationHour = 7;
    this.minCirculationHour = 5;
    this.plateNumber = plateNumber;
  }

  _isEmergencyDate(date) {
    return date.getDay() === 6 || date.getDay() === 0;
  }

  render() {
    const plates = [1,2,3,4,5,6,7,8,9,0];
    const date = new Date();

    return html`
      <main>
        <div class="container">
          <h3>#QuedateEnCasaCR 🇨🇷🦠 Restriccioncr.com</h3>
          <pwa-update-available>
            <button class="install-button">
              Actualización disponible <br />
              Instalar ahora            
            </button>
          </pwa-update-available>
          <p>
            📅${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} -  
            ⌚️${date.getHours()}:${(date.getMinutes() < 10? '0' :'') + date.getMinutes()}
          </p>
          <h1>¿Tengo restricción?</h1>

          <div class="button-box">
            <h3>🚙 Mi placa termina en:</h3>
            ${plates.map(plateNumber => html`
              <button class="myButton" 
                      @click=${() => this._calculateRestriction(date, plateNumber)}>
                      ${plateNumber}
              </button>`)}
          </div>
          ${
            this.showRestriction ?
            this.isRestricted ? 
            html`<div class="restriction-box red">
                  TENÉS RESTRICCIÓN, QUEDATE EN CASA 👮🏽‍♀️
                </div>` :
            this.isEmergency ? 
              html`<div class="restriction-box orange">
                    PODES SALIR SOLO A COMPRAR COMIDA O MEDICINAS ANTES DE LAS 5PM 🍗🥦💊
                  </div>` : 
              html`<div class="restriction-box green">
                    PODES USAR TU VEHÍCULO DESPUÉS DE LAS ${this.minCirculationHour}AM Y ANTES DE LAS ${this.maxCirculationHour}PM SI ES NECESARIO PERO <br/> 
                    <strong>TRATÁ DE QUEDARTE EN CASA 🙏🏽</strong>
                  </div>` :
              ''}

          <restriction-information .plateNumber=${this.plateNumber}></restriction-information>
        </div>    
      </main>

      <p class="app-footer">
        ❤️ 🇨🇷 Hecho con amor por
        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/brolag">@brolag</a>.
        <br />
        Código fuente en
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/brolag/quedateencasacr">GitHub</a>.
        Comunicado oficial <a target="_blank" rel="noopener noreferrer" href="https://www.presidencia.go.cr/comunicados/2020/04/nuevas-medidas-de-restriccion-aplicaran-del-13-al-30-de-abril/">aquí</a>.
      </p>
    `;
  }
}
