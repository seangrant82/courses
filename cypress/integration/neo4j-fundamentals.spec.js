describe('Test Course', () => {
    after(() => {
        cy.visit('/logout')
    })

    it('should enrol and complete course', () => {
        // Login
        cy.visit(Cypress.env('setup_url'))

        cy.intercept({ method: 'POST', url: '/callback' }).as('callback')
        cy.intercept({ method: 'POST', url: '/courses/*/*/*' }).as('answer')
        cy.intercept({ method: 'POST', url: '/courses/*/*/*/verify' }).as('verify')

        cy.get('.navbar-login')
            .click()

        // Log in to Auth0
        cy.get('.auth0-lock-input-email input').type(Cypress.env('user_email'))
        cy.get('.auth0-lock-input-show-password input').type(Cypress.env('user_password'))
        cy.get('.auth0-lock-submit').click()

        // Hack: Intercept and set cookie
        cy.wait('@callback').should(({ response }) => {
            const cookie = response.headers['set-cookie'].find(cookie => cookie.startsWith('appSession'));

            const [name, payload] = cookie.split('=')
            const [value] = payload.split(';')

            cy.setCookie(name, value)

            cy.reload()
        })

        // The user should now be logged in
        cy.get('.navbar-account')
            .contains('My Account')


        // Open course page
        cy.contains('.card a', Cypress.env('fundamentals_course_title'))
            .click()

        cy.get('.course-header h1').should('contain', Cypress.env('fundamentals_course_title'))

        //  Click Enrol
        cy.contains('.btn', 'Enrol').click()

        /**
         * 1. Introduction to Graph Theory
         */
        cy.get('.module-title').should('contain', Cypress.env('fundamentals_first_module_title'))

        // Go to first lesson
        cy.get('.pagination-link--next a').click()

        /**
         * 1.1 Seven Bridges
         */
        cy.get('iframe').should('be.visible')


        /**
         * 1.2 Graph Elements
         */

        /**
         * 1.3 Graph Structures
         */

        /**
         * 1.4. Graphs are Everywhere
         */

        /**
         * 2. Property Graphs
         */

        /**
         * 2.1 What is a Property Graph?
         */

        /**
         * 2.2 Native graph advantage
         */

        /**
         * 2.3 Native graph advantage
         */

//         /**
//          * 1. Overview Module
//          */
//         // Should be on first course

//         /**
//          * 1.1 Expanding Sandbox
//          */
//         // Go to first lesson
//         cy.get('.pagination-link--next a').click()

//         // Should have a visible sandbox
//         cy.get('.lesson-sandbox').should('have.class', 'lesson-sandbox--visible')

//         // Toggle Sandbox
//         cy.get('.lesson-sandbox-toggle').click()
//         cy.get('.lesson-sandbox').should('not.have.class', 'lesson-sandbox--visible')

//         cy.get('.lesson-sandbox-toggle').click()
//         cy.get('.lesson-sandbox').should('have.class', 'lesson-sandbox--visible')

//         // Mark lesson as read
//         cy.markAsRead()

//         // Status should be saved
//         cy.verifyLessonPassed()

//         cy.next()

//         /**
//          * 1.2 Mark Lesson As Read
//          */

//         // Toggle sandbox
//         cy.get('.lesson-sandbox-toggle').click()
//         cy.get('.lesson-sandbox').should('have.class', 'lesson-sandbox--visible')

//         cy.get('.lesson-sandbox-toggle').click()
//         cy.get('.lesson-sandbox').should('not.have.class', 'lesson-sandbox--visible')

//         cy.markAsRead()
//         cy.get('.lesson-outcome--passed a.lesson-outcome-progress').click()

//         /**
//          * 1.3 How to Run Code in Sandbox
//          */
//         cy.get('.code-header')
//             .should('contain', 'Original Title')
//             .should('contain', 'cypher')

//         // Copy to clipboard
//         cy.get('.btn-copy').first().click().should('contain', 'Copied!')

//         // Play button
//         cy.get('.btn-play').first().click()
//         cy.get('.lesson-sandbox').should('have.class', 'lesson-sandbox--visible')

//         // TODO: Check that query is properly copied
//         // cy.wait(1000)
//         // cy.get('.lesson-sandbox iframe').then($iframe => {
//         //     const editor = $iframe.contents().find('.monaco-editor')
//         //     cy.wrap(editor).should('contain', 'MATCH (')
//         // })

//         // TODO: Check role=norun
//         // TODO: Check role=noheader

//         cy.markAsRead()
//         cy.get('.lesson-outcome--passed a.lesson-outcome-progress').click()

//         /**
//          * 2. Question Types
//          */
//         cy.get('.module-title').should('contain', 'Question Types')

//         cy.next()


//         /**
//          * 2.1 Single Choice Question
//          */
//         // Incorrect answer
//         cy.get('input[type="radio"]').last().check()
//         cy.get('.btn-submit').click()

//         // Failed
//         cy.wait('@answer')
//         cy.verifyLessonFailed()

//         cy.get('input[type="radio"]').last()
//             .parents('.question-option')
//             .should('have.class', 'question-option--incorrect')

//         // Click show hint button to reveal hint
//         cy.get('.admonition-show')
//             .should('be.visible')
//             .click()

//         cy.get('.admonition').should('be.visible')

//         // Correct answer
//         cy.get('input[type="radio"]').first().check()
//         cy.get('.btn-submit').click()


//         cy.wait('@answer')

//         // - remove incorrect state from incorrect nodes
//         cy.get('input[type="radio"]').last()
//             .parents('.question-option')
//             .should('not.have.class', 'question-option--incorrect')

//         // - add correct state from incorrect nodes
//         cy.get('input[type="radio"]').first()
//             .parents('.question-option')
//             .should('have.class', 'question-option--correct')

//         cy.get('.question').should('have.class', 'question--correct')

//         cy.get('.lesson-outcome--passed').should('exist')
//         cy.get('.lesson-outcome--passed a').should('exist').click()

//         /**
//          * 2.2 Multiple Question
//          */
//         // Incorrect answer #1
//         cy.get('input[type="checkbox"]').first().check()
//         cy.get('.btn-submit').click()

//         cy.verifyLessonFailed()

//         cy.wait('@answer')

//         cy.get('input[type="checkbox"]').first().uncheck().parents('.question-option')
//             .should('have.class', 'question-option--incorrect')

//         // Combination of correct and incorrect answers
//         cy.get('input[type="checkbox"]').last().check()
//         cy.get('input[type="checkbox"]').eq(1).check()

//         cy.get('.btn-submit').click()

//         cy.wait('@answer')

//         cy.get('input[type="checkbox"]').eq(1).parents('.question-option')
//             .should('have.class', 'question-option--correct')
//         cy.get('input[type="checkbox"]').last().uncheck().parents('.question-option')
//             .should('have.class', 'question-option--incorrect')


//         // Correct Answers
//         cy.get('input[type="checkbox"]').eq(2).check()

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')

//         cy.nextLesson()

//         /**
//          * 2.3 Select in Code
//          */
//         // Incorrect
//         // TODO: Stop asciidoctor from adding ligatures
//         cy.get('select').select('-[:ACTED_IN]→')

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')

//         cy.verifyLessonFailed()


//         // Correct
//         cy.get('select').select('←[:ACTED_IN]-')

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')

//         cy.verifyLessonPassed(false)
//         cy.nextLesson()


//         /**
//          * 2.4 Input in Code
//          */
//         // Incorrect
//         cy.get('input').type('Foo')

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')
//         cy.verifyLessonFailed()

//         // Correct
//         cy.get('input').clear().type('Movie:Comedy')

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')
//         cy.verifyLessonPassed(false)

//         cy.nextLesson()

//         /**
//          * 2.5 Free Text
//          */
//         // Incorrect
//         cy.get('input').type('Foo')

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')
//         cy.verifyLessonFailed()

//         // Correct
//         cy.get('input').clear().type('Adam')

//         cy.get('.btn-submit').click()
//         cy.wait('@answer')
//         cy.verifyLessonPassed(false)

//         cy.nextLesson()

//         /**
//          * 2.6 Database Verification
//          */
//         // Correct
//         cy.get('.verify input.btn').click()
//         cy.wait('@verify')

//         cy.get('.lesson-outcome--passed').should('exist')
//         cy.reload()

//         /**
//          * Verify completion
//          */
//         cy.get('.course-completed').should('exist')
//         cy.get('.course-completed a').click()

//         /**
//          * Certificate
//          */
//         cy.contains('p', 'has completed').should('exist')

//         cy.contains('a', 'My Achievements').click()
//         cy.get('.achievement-group--completed').should('contain', Cypress.env('test_course_title'))

//         /**
//          * Logout
//          */
//         // cy.get('.navbar-account').parent().trigger('mouseover')
//         // cy.get('.navbar-logout').click()
//         // cy.visit('/logout')
    })
})