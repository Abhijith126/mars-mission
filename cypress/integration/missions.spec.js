/// <reference types="cypress" />

describe('Missions', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/');
    cy.intercept('GET', '/missions', { fixture: 'missions.json' });
    cy.intercept('DELETE', '/missions/1', { fixture: 'empty.json' }).as('deleteMission');
  });

  it('renders missions', () => {
    cy.get('[data-test-id="missions-header"]').contains('Missions');
    cy.get('[data-test-id="mission-table"]').as('MissionsTable');
    cy.get('@MissionsTable').should('exist');

    cy.get('[data-test-id="mission-row"]').as('MissionsRow');
    cy.get('@MissionsRow').should('have.length', 3);
    cy.get('@MissionsRow').eq(0).find('[data-test-id="mission-row-name"]').contains('Expedition 2028');
    cy.get('@MissionsRow').eq(0).find('[data-test-id="mission-row-count"]').contains('4');
    cy.get('@MissionsRow').eq(0).find('[data-test-id="mission-row-destination"]').contains('Helena 54');
    cy.get('@MissionsRow').eq(0).find('[data-test-id="mission-row-departure"]').contains('23/11/2025');
    cy.get('@MissionsRow').eq(0).find('[data-test-id="mission-row-departure"]').contains('in 48 months');
  });

  it('fitlter missions by name', () => {
    cy.get('[data-test-id="mission-row"]').as('MissionsRow');
    cy.get('@MissionsRow').should('have.length', 3);

    cy.get('[data-test-id="mission-search"]').as('FilterInput');
    cy.get('@FilterInput').clear();
    cy.get('[data-test-id="mission-empty"').should('not.exist');

    cy.get('@FilterInput').type('20');
    cy.get('@MissionsRow').should('have.length', 2);
    cy.get('@FilterInput').type('28');
    cy.get('@MissionsRow').should('have.length', 1);
    cy.get('@FilterInput').type('202800');
    cy.get('@MissionsRow').should('have.length', 0);
    cy.get('[data-test-id="mission-empty"').contains('No records to display');
  });

  it('delete a mission', () => {
    cy.get('[data-test-id="mission-row"]').as('MissionsRow');
    cy.get('@MissionsRow').should('have.length', 3);

    cy.get('[data-test-id="mission-delete"]').eq(0).click();
    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.wait('@deleteMission').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      expect(request.body).to.eq('');
    });
  });

  it('navigate to edit a mission', () => {
    cy.get('[data-test-id="mission-edit"]').eq(0).click();
    cy.url().should('contain', '/mission/1');
    cy.get('[data-test-id="missionsForm-title"]').contains('Edit mission');
  });

  it('navigate to a new mission', () => {
    cy.get('[data-test-id="missions-new"]').eq(0).click();
    cy.url().should('contain', '/mission');
    cy.get('[data-test-id="missionsForm-title"]').contains('Configure a new mission');
  });
});
