describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });
  it('should display login page correctly', () => {
    // verifikasi elemen yang harus muncul pada halaman login
    cy.get('input[placeholder="Username"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when username is empty', () => {
    // click login button without filling username box
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify the window.alert to pops the message from API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"id" is not allowed to be empty');
    });
  });

  it('should display alert when password is empty', () => {
    // fill the username box
    cy.get('input[placeholder="Username"]').type('testuser');

    // click login button without filling password box
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // verify the window.alert to pops the message from API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi username
    cy.get('input[placeholder="Username"]').type('testuser');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.on('window:alert', (str) => {
      expect(str).to.equal('User ID or password is wrong');
    });
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi username
    cy.get('input[placeholder="Username"]').type('testuser');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('test123456');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('nav')
      .contains(/^Home$/)
      .should('be.visible');
    cy.get('button').contains('Sign out').should('be.visible');
  });
});
