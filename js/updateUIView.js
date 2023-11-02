import ValidateFormView from "./validateFormView.js";

class UpdateUIView extends ValidateFormView {
    // ---------- Card ---------- //
    cardNum = document.querySelector('.number');
    cardOwner = document.querySelector('.owner');
    cardDateMonth = document.querySelector('.date-month');
    cardDateYear = document.querySelector('.date-year');
    cardCVC = document.querySelector('.card__back__cvc');

    constructor() {
        super();
        
        this.checkFormatAndLength();
        this.updateCard();
        this.updateCardNumber();
        this.submitForm();
    }

    checkFormatAndLength() {
        const numbers = /^[0-9]/;
        const characters = /^[a-zA-Z]/;

        this.carholder.addEventListener('input', function(e) {
            if (!characters.test(e.target.value) || numbers.test(e.target.value)) e.target.value = '';
        });

        [this.cardNumber, this.expMonth, this.expYear, this.cvc].forEach(function(field) {
            field.addEventListener('input', function() {
                if (!numbers.test(field.value)) {
                    field.value = '';
                }
            
                if (field.value.length > field.maxLength) {
                    field.value = field.value.slice(0, field.maxLength);
                }
            });
        });
    }

    updateCardNumber() {
        this.cardNumber.addEventListener('input', function(e) {
            const numbers = e.target.value.replace(/\D/g, '');
            const formattedNumbers = numbers.replace(/(\d{4})/g, '$1 ').trim();

            this.cardNum.textContent = formattedNumbers;
        }.bind(this));
    }

    updateCard() {
        const that = this;

        [this.carholder, this.cardNumber, this.expMonth, this.expYear, this.cvc].forEach(function(field, i) {
            field.addEventListener('input', function() {
                field.classList.contains('nameField') ? that.cardOwner.textContent = field.value :
                field.classList.contains('expYear') ? that.cardDateYear.textContent = field.value :
                field.classList.contains('cvc') ? that.cardCVC.textContent = field.value : null;

                if (i === 2) {
                    !/^0/.test(field.value) && +field.value < 10 ? 
                        that.cardDateMonth.textContent = `0${field.value}` :
                        that.cardDateMonth.textContent = field.value;
                }
            });
        });
    }

    submitForm() {
        this.form.addEventListener('submit', function(e) {
            e.preventDefault();

            this.formData = new FormData(e.target);

            this.validateForm();
        }.bind(this));
    }
};

export default new UpdateUIView();