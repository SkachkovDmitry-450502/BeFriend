/*
(function() {

    var config = {
        // variables
        selectors: {
            startButton: ".startButton",
            namedErrorButton: ".beta-errorSend",
            userErrorField: ".beta-errorInput",
            userErrorSendButton: ".beta-errorInputSend",
            notification: ".notification"
        },
        notificationTime: 5000
    }

    function showNotification() {
        document.querySelector(config.selectors.notification).classList = config.selectors.notification.substr(1);

        setTimeout(function() {
            document.querySelector(config.selectors.notification).classList = config.selectors.notification.substr(1) + " hidden";
        }, config.notificationTime);
    }

    var namedErrors = document.querySelectorAll(config.selectors.namedErrorButton);

    for (var i = 0; i < namedErrors.length; i++) {
        namedErrors[i].addEventListener("click", function(e) {

            ga('send', {
                hitType: 'event',
                eventCategory: 'Error Button',
                eventAction: 'Known Error',
                eventLabel: this.innerHTML
            });

            showNotification();

            e.preventDefault();
            return false;
        });
    } 

    var userErrorSendButton = document.querySelector(config.selectors.userErrorSendButton);

    userErrorSendButton.addEventListener("click", function(e) {

        ga('send', {
            hitType: 'event',
            eventCategory: 'Error Button',
            eventAction: 'User Error',
            eventLabel: document.querySelector(config.selectors.userErrorField).value
        });

        showNotification();

        e.preventDefault();
        return false;
    });

}());
*/