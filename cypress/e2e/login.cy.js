describe ("login page Test cases", () => {
it ("Visit Login Page", () => {
    cy.visit("http://localhost:3000");
    cy.title().should("eq", "React Gallery");
    cy.contains("Hello Again")

});

it("Constans email and password input and login button", () => {
    // checkemail
    const email = cy.get("input[name='email']");
    email.should("be.visible");
    email.should("have.attr", "type", "email");
    email.should("have.attr", "placeholder", "Email Address");

    // checkpassword
    const password = cy.get("input[name='password']");
    password.should("be.visible");
    password.should("have.attr", "type", "password");
    password.should("have.attr", "placeholder", "Password");

     // checkbutton
     const button = cy.get("button");
     button.should("be.visible");
     button.contains("Login");
     button.should("have.css", "background-color", "rgb(79, 70, 229)");
     button.should("have.css", "color", "rgb(255, 255, 255)");
    });

     it('Do login with null value', () => {
        const button = cy.get("button");
        button.click()
        cy.on('window alert', (text) => {
            expect(text).to.contains("login failed");
        });
     });
    
     it('Do login with Wrong values', () => {
        const email = cy.get("input[name='email']");
        email.type("wrong@react.test")

        const password = cy.get("input[name='password']");
        password.type("password")

        const button = cy.get("button");
        button.click();

        cy.on('window alert', (text) => {
            expect(text).to.contains("login failed");
    });
});

    it('Do login with Correct values', () => {
        const email = cy.get("input[name='email']");
        email.type("user@react.test")

        const password = cy.get("input[name='password']");
        password.type("password")

        const button = cy.get("button");
        button.click();

        cy.on('window alert', (text) => {
            expect(text).to.contains("welcome");
    });

        cy.url().should("eq", "http://localhost:3000/dashboard");
});

        it("Found No post for the First Time", () => {
            cy.contains("Found 0 photos");
        });

        it ("Contains image url and descriptions input, and Publish button", () => {
            //check image
            const image = cy.get("input[name='image']");
            image.should("be.visible");
            image.should("have.attr", "type", "url");
            image.should("have.attr", "required", "required");
            image.should("have.attr", "placeholder", "Image URL");
            
            //check description
             const description = cy.get("input[name='desc']");
             description.should("be.visible");
             description.should("have.attr", "type", "text");
             description.should("have.attr", "required", "required");
             description.should("have.attr", "placeholder", "What's on your mind?");

            //check publish button
            const button = cy.get("button");
            button.should("be.visible");
            button.contains("Publish!");
            button.should("have.css", "background-color", "rgb(79, 70, 229)");
            button.should("have.css", "color", "rgb(255, 255, 255)");
        });
            it("Upload some photos", () => {
                const photos = [
                    {
                        imageValue: 
                        "https://images.unsplash.com/photo-1657299170950-9da95993c9ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                        descriptionValue: "Image 1 : Lorem ipsum",
                    },
                    {
                        imageValue:
                        "https://images.unsplash.com/photo-1661100543622-b6335aadf6f3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
                        descriptionValue: "image 2: Lorem picsum",
                    },
                ];
                photos.forEach(({imageValue, descriptionValue}) => {
                    const image = cy.get("input[name='image']");
                    image.type(imageValue);

                    const description = cy.get("input[name='desc']");
                    description.type(descriptionValue);

                    const button = cy.get("button");
                    button.click();

                    //check uploaded image is exits
                    cy.get("img").should("have.attr", "src", imageValue);
                    cy.contains(descriptionValue); 
                    });

                    cy.contains(`Found ${photos.length} photos`)
        });
});