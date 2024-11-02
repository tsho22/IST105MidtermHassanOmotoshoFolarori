function authStateListener() {

    // [START auth_state_listener]
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/v8/firebase.User
            var uid = user.uid;
            location.href = 'culturalconnections.html';
            // ...
        } else {
            // User is signed out
            // ...

        }
    });
    // [END auth_state_listener]
}

window.addEventListener('load', function () {



    //Listen for auth state changes
    authStateListener();


    //Listener for EMAIL/PASSWORD Button

    this.document.getElementById('sign-in').addEventListener('click', function () {
        // Instruction

        let emailTxt = document.getElementById('email').value;
        let passtxt = document.getElementById('password').value;

        firebase.auth().signInWithEmailAndPassword(emailTxt, passtxt)
            .then((userCredential) => {
                // Signed in
                let user = userCredential.user;
                // ...
                alert('Logging sucessfully');
                location.href = 'culturalconnections.html';
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert('Logging fail');
                console.log('Logging fail', errorMessage);
            });

    });

    //Listener for GMAIL Button

    document.getElementById("sign-in-gmail" ).addEventListener('click', function () {

        let provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('email');
        firebase.auth().signInWithPopup(provider)
            .then(function (result) {
                alert('Logging sucessfully');
                location.href = 'culturalconnections.html';
            })
            .catch(function (error) {
                console.log('Logging fail', error);
            });
    });

    //Listener for Phone Button

    document.getElementById("sign-in-phone").addEventListener('click', function () {

        // [START auth_phone_signin]
        const phoneNumber = getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;

                alert('Logging sucessfully');
                location.href = 'culturalconnections.html';
                // ...
            }).catch((error) => {
                // Error; SMS not sent
                // ...
                console.log('Logging fail', error);
            });
        // [END auth_phone_signin]



        function recaptchaVerifierSimple() {
            // [START auth_phone_recaptcha_verifier_simple]
            window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            // [END auth_phone_recaptcha_verifier_simple]
        }


        function recaptchaRender() {
            /** @type {firebase.auth.RecaptchaVerifier} */
            const recaptchaVerifier = window.recaptchaVerifier;

            // [START auth_phone_recaptcha_render]
            recaptchaVerifier.render().then((widgetId) => {
                window.recaptchaWidgetId = widgetId;
            });
            // [END auth_phone_recaptcha_render]
        }



        function getPhoneNumberFromUserInput() {
            return "+15558675309";
        }



    });





});
