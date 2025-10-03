/**
 * Copyright 2025 nguyenjanel
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0; //default starting count
    this.min = -25; //default starting min
    this.max = 25; //default starting max

    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  //Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: { type: Number, reflect: true },
      max: { type: Number, reflect: true },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      :host([count="18"]){
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host([count="21"]){
        color: var(--ddd-theme-default-original87Pink);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter {
        //font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
        font-size: 100px; //bigger font size
      }
      button{
        background-color:var(--ddd-theme-default-alertImmediate);
        padding: 10px;
        padding-left: 15px;
        padding-right: 15px;
        border: solid white;
        border-radius: var(--ddd-radius-md);
        font-size: 18px;
        color: black;
      }
      button:hover{ //hover effect
        background-color: var(--ddd-theme-default-disabled);
        box-shadow: var(--ddd-boxShadow-sm);
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="counter">${this.count}</div>
      <div class="buttons">
        <button ?disabled=${this.count <= this.min} @click=${this.decrease}>-</button>
        <button @click=${this.reset}>Reset</button>
        <button ?disabled=${this.count >= this.max} @click=${this.increase}>+</button>
      </div>
    `;
  }
  increase(){
    if (this.count < this.max) { //if count is less then max, then allow increment
    this.count++;
    }
  }
  decrease(){
    if (this.count > this.min) { //if count is greater than min, then allow decrement
    this.count--;
    }
  }
  reset(){
    this.count = 0; //reset back to 0
  }
  updated(changedProperties) {
    if (super.updated) {
      super.updated(changedProperties);
    }
    if (changedProperties.has('count')) {
      if (this.count === 21) {
        this.makeItRain(); //call function for confetti if count is 21
      }
    }
    
    //change color if count hits max,min,18,21
    const counterDiv = this.shadowRoot.querySelector('.counter');
    if (this.count === this.max) {
      counterDiv.style.color = 'var(--ddd-theme-default-inventOrange)'; e
    }
    else if (this.count === this.min) {
      counterDiv.style.color = 'var(--ddd-theme-default-original87Pink)';
    }
    else if (this.count === 18) {
      counterDiv.style.color = 'var(--ddd-theme-default-athertonViolet)';
    }
    else if (this.count === 21) {
      counterDiv.style.color = 'var(--ddd-theme-default-futureLime)';
    }
    else{ //default color
      counterDiv.style.color = 'var(--ddd-theme-default-coalyGray)';
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        const confetti = document.querySelector("#confetti");
        if (confetti) {
          confetti.setAttribute("popped", ""); //make the confetti pop
        }
      }, 0);
    });
  }
  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);