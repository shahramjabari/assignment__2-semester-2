class Validation {
  // Define the array globally within the class
  static fields = [
    {
      name: "medicine-name",
      message: "Please enter medicine name",
    },
    {
      name: "manufacturer",
      message: "Please enter manufacture name",
    },
    {
      name: "expiration-date",
      message: "Please enter expiration date",
    },
    {
      name: "quantity",
      message: "Please enter an amount of medicines",
    },
  ];

  static initializeValidation(validationMessage) {
    Validation.fields.forEach((field) => {
      const inputField = document.querySelector(
        `.form-modal__input--${field.name}`
      );

      if (inputField) {
        inputField.addEventListener("input", () => {
          inputField.classList.remove("form__invalid-input");
          validationMessage.textContent = "";
        });
      }
    });
  }

  static validationFormMessage(validationMessage) {
    for (let field of Validation.fields) {
      const inputField = document.querySelector(
        `.form-modal__input--${field.name}`
      );

      validationMessage.textContent = "";

      if (inputField && !inputField.value.trim()) {
        validationMessage.style.display = "block";
        validationMessage.textContent = field.message;
        inputField.classList.add("form__invalid-input");
        return false;
      }
    }

    return true;
  }
}

export default Validation;
