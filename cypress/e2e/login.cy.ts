describe('User Login', () => {
  it('should log in with the newly registered user', () => {
    // Navegar a la página de login
    cy.visit('/login');

    // Rellenar el formulario de login con los datos del usuario registrado
    cy.get('ion-input[formControlName="email"]').type('juan.perez@example.com');
    cy.get('ion-input[formControlName="password"]').type('Password@123');

    // Envía el formulario
    cy.get('form').submit();

    // Verifica que el inicio de sesión fue exitoso
    cy.url().should('include', '/home');
    cy.contains('Bienvenido, Juan');
  });
});