(() => {
  "use strict";
  const form = document.querySelector("#registration-form");
  const fields = {
    name: document.querySelector("#name"), email: document.querySelector("#email"),
    password: document.querySelector("#password"), confirmPassword: document.querySelector("#confirm-password"),
    age: document.querySelector("#age")
  };
  const status = document.querySelector("#form-status");
  function setError(field, message) {
    document.querySelector(`#${field.id}-error`).textContent = message;
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }
  function validateName() {
    const v = fields.name.value.trim();
    const e = !v ? "Please enter your name." : v.length < 2 ? "Name must be at least 2 characters." : "";
    setError(fields.name, e); return !e;
  }
  function validateEmail() {
    const v = fields.email.value.trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    const e = !v ? "Please enter your email." : !ok ? "Enter a valid email address." : "";
    setError(fields.email, e); return !e;
  }
  function validatePassword() {
    const v = fields.password.value;
    const e = !v ? "Please enter a password." : v.length < 8 ? "Password must be at least 8 characters." : "";
    setError(fields.password, e);
    if (fields.confirmPassword.value) validateConfirmPassword();
    return !e;
  }
  function validateConfirmPassword() {
    const v = fields.confirmPassword.value;
    const e = !v ? "Please confirm your password." : v !== fields.password.value ? "Passwords do not match." : "";
    setError(fields.confirmPassword, e); return !e;
  }
  function validateAge() {
    const v = fields.age.value.trim(), n = Number(v);
    const e = !v ? "Please enter your age." : !Number.isInteger(n) || n < 1 || n > 120 ? "Age must be a whole number from 1 to 120." : "";
    setError(fields.age, e); return !e;
  }
  const validators = [[fields.name, validateName], [fields.email, validateEmail], [fields.password, validatePassword], [fields.confirmPassword, validateConfirmPassword], [fields.age, validateAge]];
  validators.forEach(([field, validate]) => {
    field.addEventListener("input", () => { validate(); status.hidden = true; });
    field.addEventListener("blur", validate);
  });
  form.addEventListener("submit", event => {
    const valid = validators.map(([, validate]) => validate()).every(Boolean);
    if (!valid) {
      event.preventDefault(); status.hidden = false; status.className = "alert alert-error";
      status.textContent = "Please fix the errors above before submitting.";
      form.querySelector('[aria-invalid="true"]')?.focus(); return;
    }
    // Demo only: no server exists, so valid data is not sent or stored.
    event.preventDefault(); status.hidden = false; status.className = "alert alert-success";
    status.textContent = "Form looks valid! This demo does not send or store your information.";
  });
  form.addEventListener("reset", () => setTimeout(() => {
    validators.forEach(([field]) => setError(field, "")); status.hidden = true; status.textContent = "";
  }, 0));
})();
