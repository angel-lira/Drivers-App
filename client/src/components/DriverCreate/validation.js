export default (input) => {
  const errors = { allConditions: true };
  const regexURL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
  const regexImageURL = /^(http(s)?:\/\/)?\S+\.(jpeg|jpg|png)$/;
  const regexLetters = /^[A-Za-z]+( [A-Za-z]+)*$/;

  const regexDescription = /^[\w\s\d.,!?áéíóúÁÉÍÓÚüÜñÑ]+$/;

  /// FORENAME
  if (!input.forename) {
    errors.forename = "Debe ingresar un nombre.";
    errors.allConditions = false;
  } else if (input.forename.length < 3) {
    errors.forename = "El nombre debe tener al menos 3 caracteres.";
    errors.allConditions = false;
  } else if (input.forename.length > 15) {
    errors.forename = "El nombre no puede tener más de 15 caracteres.";
    errors.allConditions = false;
  } else if (!regexLetters.test(input.forename)) {
    errors.forename = "El nombre solo puede contener letras";
    errors.allConditions = false;
  }

  /// SURNAME
  if (!input.surname) {
    errors.surname = "Debe ingresar un apellido.";
    errors.allConditions = false;
  } else if (input.surname.length < 3) {
    errors.surname = "El apellido debe tener al menos 3 caracteres.";
    errors.allConditions = false;
  } else if (input.surname.length > 15) {
    errors.surname = "El apellido no puede tener más de 15 caracteres.";
    errors.allConditions = false;
  } else if (!regexLetters.test(input.surname)) {
    errors.surname = "El apellido solo puede contener letras.";
    errors.allConditions = false;
  }

  /// NATIONALITY
  if (!input.nationality) {
    errors.nationality = "Debe ingresar una nacionalidad";
    errors.allConditions = false;
  } else if (
    !regexLetters.test(input.nationality) ||
    input.nationality.length > 15 ||
    input.nationality.length < 3
  ) {
    errors.nationality = "La nacionalidad ingresada no es válida.";
    errors.allConditions = false;
  }

  /// IMAGE
  if (!input.image) {
    errors.image = "Debe ingresar una URL de imagen.";
    errors.allConditions = false;
  } else if (input.image === "ImageNotFound") {
    errors.image = "No se encontró la imagen";
    errors.allConditions = false;
  } else {
    if (!regexURL.test(input.image)) {
      errors.image = "Debe ser una URL";
      errors.allConditions = false;
    } else if (!regexImageURL.test(input.image)) {
      errors.image = "Debe ser una URL que termine en .jpeg, .jpg o .png.";
      errors.allConditions = false;
    }
  }
  /// DOB
  if (!input.dob) {
    errors.dob = "Debe ingresar una fecha de nacimiento.";
    errors.allConditions = false;
  } else {
    const dobDate = new Date(input.dob);
    const hoy = new Date();

    const edad = hoy.getFullYear() - dobDate.getFullYear();

    if (edad < 0) {
      errors.dob = "¿eres del futuro? No puedes ser del futuro";
      errors.allConditions = false;
    } else if (edad < 18) {
      errors.dob = "Debes tener al menos 18 años para registrarte.";
      errors.allConditions = false;
    } else if (edad > 50) {
      errors.dob = "Debes tener menos de 50 años para registrarte.";
      errors.allConditions = false;
    }
  }
  /// DESCRIPTION
  if (!input.description) {
    errors.description = "Debe ingresar una descripción.";
    errors.allConditions = false;
  } else if (input.description.length > 255) {
    errors.description = "La descripción no debe tener más de 255 caracteres.";
    errors.allConditions = false;
  } else if (!regexDescription.test(input.description)) {
    errors.description =
      "La descripción solo puede contener letras, números y signos de puntuación y acentuación.";
    errors.allConditions = false;
  }

  /// TEAMS
  if (!input.teams) {
    errors.teams = "Debe ingresar una teams.";
    errors.allConditions = false;
  }

  return errors;
};
