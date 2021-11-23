/// <reference types="cypress" />

describe('Missions Form', () => {
  beforeEach(() => {
    cy.server();
    cy.visit('/mission');
    cy.intercept('GET', '/missions', { fixture: 'missions.json' });
    cy.intercept('POST', '/missions', { fixture: 'missions.json' }).as('createMission');
  });

  it('create a mission', () => {
    cy.get('[data-test-id="missionsForm-title"]').contains('Configure a new mission');
    cy.get('[data-test-id="missionForm-submit"]').click();

    cy.get('[data-test-id="missionForm-name"]').as('MissionName');
    cy.get('[data-test-id="missionForm-destination"]').as('MissionDestination');

    cy.get('@MissionName').click();
    cy.get('@MissionDestination').click();
    cy.get('[data-test-id="input-error"]').contains('Mission name is required');
    cy.get('@MissionName').type('Mission Saturn');
    cy.get('[data-test-id="input-error"]').contains('Mission destination is required');
    cy.get('@MissionDestination').type('Saturn');
    cy.get('[data-test-id="missionForm-submit"]').click();

    cy.get('[data-test-id="membersForm-row-1"]').find('[data-test-id="membersForm-type"]').select('Engineer');
    cy.get('[data-test-id="input-error"]').contains('Min 10 years of experience');
    cy.get('[data-test-id="membersForm-row-0"]').find('[data-test-id="membersForm-experience"]').type('10');
    cy.get('[data-test-id="membersForm-row-1"]').find('[data-test-id="membersForm-experience"]').type('10');
    cy.get('[data-test-id="membersForm-row-2"]').find('[data-test-id="membersForm-experience"]').type('10');
    cy.get('[data-test-id="missionForm-submit"]').click();
    cy.get('[data-test-id="alert"]').should('exist').contains('A mission must have atlest 1 passenger');
    cy.get('[data-test-id="alert-action"]').click();

    cy.get('[data-test-id="membersForm-add"]').click();
    cy.get('[data-test-id="membersForm-row-3"]').find('[data-test-id="membersForm-age"]').type('20');
    cy.get('[data-test-id="membersForm-row-3"]').find('[data-test-id="membersForm-remove"]').should('not.exist');
    cy.get('[data-test-id="membersForm-add"]').click();
    cy.get('[data-test-id="membersForm-row-4"]').find('[data-test-id="membersForm-age"]').type('21');
    cy.get('[data-test-id="membersForm-row-3"]').find('[data-test-id="membersForm-remove"]').should('exist');
    cy.get('[data-test-id="membersForm-row-4"]').find('[data-test-id="membersForm-remove"]').should('exist').click();

    cy.get('[data-test-id="missionForm-submit"]').click();
    cy.get('[data-test-id="alert"]').should('exist').contains('Multiple Engineers cannot have same job');
    cy.get('[data-test-id="alert-action"]').click();

    cy.get('[data-test-id="membersForm-row-2"]').find('[data-test-id="membersForm-job"]').select('Maintenance');
    cy.get('[data-test-id="missionForm-submit"]').click();

    // eslint-disable-next-line jest/valid-expect-in-promise
    cy.wait('@createMission').then(({ request, response }) => {
      expect(response.statusCode).to.eq(200);
      console.log(request.body);
      expect(request.body).to.deep.equal({
        name: 'Mission Saturn',
        members: [
          { type: 'Pilot', experience: 10 },
          { type: 'Engineer', experience: 10, job: 'Navigation' },
          { type: 'Engineer', experience: 10, job: 'Maintenance' },
          { type: 'Passenger', age: 20, wealth: '' },
        ],
        destination: 'Saturn',
        departure: '2021-11-23',
      });
    });
  });
});
