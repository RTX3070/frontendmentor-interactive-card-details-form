class PopUp extends HTMLDivElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        this.carholder = document.querySelector('input[name="carholder"]');
        this.cardNumber = document.querySelector('input[name="cardNumber"]');
        this.expMonth = document.querySelector('.expMonth');
        this.expYear = document.querySelector('.expYear');
        this.cvc = document.querySelector('.cvc');
    }

    showPopUp() {
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    align-items: center;
                    background-color: #fff;
                    display: flex;
                    flex-flow: column nowrap;
                    font-family: 'Space Grotesk', sans-serif;
                    font-weight: 500;
                    height: 100%;
                    justify-content: center;
                    left: 0;
                    position: absolute;
                    top: 0;
                    width: 100%;
                }

                h2 {
                    text-transform: uppercase;
                }

                p {
                    color: hsl(279, 6%, 55%);
                    font-size: 1.6rem;
                    margin: 0 0 3.3rem 0;
                }

                button {
                    background-color: hsl(278, 68%, 11%);
                    border: none;
                    border-radius: .8rem;
                    color: hsl(0, 100%, 100%);
                    cursor: pointer;
                    display: block;
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.8rem;
                    font-weight: 500;
                    margin-top: 1.8rem;
                    padding: 1.5rem 0;
                    width: 100%;
                }
            </style>

            <img src="images/icon-complete.svg" alt="">
            <h2>Thank you!</h2>
            <p>We've added your card details</p>
            <button>Continue</button>
        `;

        this.shadowRoot.querySelector('button').addEventListener('click', function() {
            this.dataset.open = 'false';
        }.bind(this));
    }

    hidePopUp() {
        this.shadowRoot.innerHTML = '';

        [this.carholder, this.cardNumber, this.expMonth, this.expYear, this.cvc].forEach(field => field.value = '');
    }

    static get observedAttributes() {
        return ['data-open'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-open' && oldValue === newValue) return;

        if (name === 'data-open' && newValue === 'true') this.showPopUp();

        if (name === 'data-open' && newValue === 'false') this.hidePopUp();
    }
};

customElements.define('pop-up', PopUp, { extends: 'div' });