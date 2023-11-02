export default class ValidateFormView {
    // ---------- Form ---------- //
    form = document.querySelector('.module');
    carholder = document.querySelector('input[name="carholder"]');
    cardNumber = document.querySelector('input[name="cardNumber"]');
    expMonth = document.querySelector('input[name="expMonth"]');
    expYear = document.querySelector('input[name="expYear"]');
    cvc =  document.querySelector('.cvc');

    formData;
    formState = {
        carholder: true,
        cardNumber: true,
        expMonth: true,
        expYear: true,
        cvc: true
    };

    resetForm() {
        for (const key of Object.keys(this.formState)) {
            const field = this.form.querySelector(`[name="${key}"]`);

            this.formState[key] = true;

            this.hideResetError(field);
        }
    }

    showError(field, msg, state = undefined) {
        field.parentElement.classList.add('error');

        const paragraph = document.createElement('p');
        paragraph.textContent = msg;

        field.parentElement.appendChild(paragraph);

        state = false;
    }

    showSuccess() {
        const successPopUp = document.querySelector('div[is="pop-up"]');

        const state = [...Object.values(this.formState)].every(function(state) {
            return state === true;
        });

        if (state) successPopUp.dataset.open = true;
    }

    hideResetError(field) {
        field.parentElement.classList.remove('error');

        const paragraph = field.parentElement.querySelector('p');

        if (paragraph) {
            field.parentElement.removeChild(paragraph);
        }
    }

    checkEmptyFields() {
        for (const [key, value] of this.formData.entries()) {
            const field = this.form.querySelector(`[name="${key}"]`);

            if (value === '') {
                this.showError(field, 'Can\'t be blank');
                this.formState[key] = false;
            }
        }
    }

    checkStringFormat() {
        const invalidCharacters = /[0-9@#,:;´`~%&\|\!\<\>\.\^\$\?\*\/"£§°\-_\=\()\[\]\{}]+/g;

        if (this.formState.carholder === true && invalidCharacters.test(this.carholder.value))
            this.showError(this.carholder, 'Wrong format, letters only', this.formState.carholder);
    }

    checkNumbersLength() {
        if (this.formState.cardNumber === true && this.cardNumber.value.length < 16) 
            this.showError(this.cardNumber, 'Sequence too short', this.formState.cardNumber);

        if (this.formState.cvc === true && this.cvc.value.length < 3) 
            this.showError(this.cvc, 'Sequence too short', this.formState.cvc);
    }

    checkDate() {
        if (this.formState.expMonth === true && this.expMonth.value > 12)
            this.showError(this.expMonth, 'Month not valid', this.formState.expMonth);

        if (this.formState.expYear === true && (this.expYear.value < 23 || this.expYear.value > 30)) 
            this.showError(this.expYear, 'Year not valid', this.formState.expYear);
    }

    validateForm() {
        this.resetForm();
        this.checkEmptyFields();
        this.checkStringFormat();
        this.checkNumbersLength();
        this.checkDate();
        this.showSuccess();
    }
};