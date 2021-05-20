describe('User app', () => {
    beforeEach(() =>{
        cy.visit('http://localhost:5500')
    });

    const nameInput = () => cy.get('input[name=name]');
    const emailInput = () => cy.get('input[name=email]');
    const passwordInput = () => cy.get('input[name=password]');
    const submitBtn = () => cy.get('#submitBtn');

    it('sanity check to make sure tests work', () => {
        expect(1+2).to.equal(3)
        expect(2+2).not.to.equal(5)
        expect({}).not.to.equal({})
        expect({}).to.eql({})
    });

    it('get name and put something in it', () => {
        nameInput()
        .should('have.value', '')
        .type('Cooper Woods')
        .should('have.value', 'Cooper Woods')
    });

    it('get email and add one', () => {
        emailInput()
        .should('have.value', '')
        .type('123@i.com')
        .should('have.value', '123@i.com')
    });

    it('get password and add one', () => {
        passwordInput()
        .should('have.value', '')
        .type('12345678')
        .should('have.value', '12345678')
    });

    it('check if can submit form data', () => {
        nameInput().should('have.value', '');
        emailInput().should('have.value', '');
        passwordInput().should('have.value', '');
        submitBtn().should('be.disabled');

        nameInput()
        .type('Cooper Woods')
        .should('have.value', 'Cooper Woods');
        submitBtn().should('be.disabled');

        emailInput()
        .type('123@i.com')
        .should('have.value', '123@i.com');
        submitBtn().should('be.disabled');

        passwordInput()
        .type('12345678')
        .should('have.value', '12345678');
        submitBtn().should('be.disabled');

        submitBtn()
        .click()
        .pause()

    });

     it('check if submission will go with mission data', () => {
        nameInput()
        .type('Coop')
        .should('have.value', 'Coop')
        .clear()

        emailInput()
        .type('123@i.com')
        .should('have.value', '123@i.com')
        .clear();

        passwordInput()
        .type('12345678')
        .should('have.value', '12345678')
        .clear();

     });
})