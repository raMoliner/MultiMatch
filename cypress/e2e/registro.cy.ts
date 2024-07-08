describe('User Registration', () => {
  it('should navigate to the registration page and register a new user', () => {
    // Navegar a la página de login
    cy.visit('/login');

    // Esperar que el botón de registro esté visible y hacer clic en él
    cy.contains('Registrarse').should('be.visible').click();

    // Esperar que la página de registro cargue
    cy.url().should('include', '/register');

    // Rellenar el formulario de registro
    cy.get('ion-select[formControlName="tipoUsuario"]').click();
    cy.get('ion-select-option[value="jugador"]').click();
    cy.get('ion-input[formControlName="rut"]').type('12.345.678-9');
    cy.get('ion-input[formControlName="nombre"]').type('Juan');
    cy.get('ion-input[formControlName="apellidoPaterno"]').type('Pérez');
    cy.get('ion-input[formControlName="apellidoMaterno"]').type('Gómez');
    cy.get('ion-input[formControlName="email"]').type('juan.perez@example.com');
    cy.get('ion-input[formControlName="edad"]').type('25');
    cy.get('ion-select[formControlName="posicion"]').click();
    cy.get('ion-select-option').contains('Delantero').click();
    cy.get('ion-input[formControlName="password"]').type('Password@123');
    cy.get('ion-input[formControlName="confirmPassword"]').type('Password@123');
    cy.get('ion-toggle[formControlName="buscandoEquipo"]').click();

    // Envía el formulario
    cy.get('form').submit();

    // Verifica que el registro fue exitoso redireccionando al home
    cy.url().should('include', '/home');
  });
});
