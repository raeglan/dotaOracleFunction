const Alexa = require('ask-sdk');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechText = 'Hey, welcome to the game.';
        const reprompt = 'I am here when you need me.';

        return handlerInput.reponseBuilder
            .speak(speechText)
            .reprompt(reprompt)
            .withSimpleCard("DotA's Oracle", speechText)
            .getResponse();
    }
};

const RoshanDiedIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
            handlerInput.requestEnvelope.request.intent.name === 'RoshanDiedIntent';
    },
    handle(handlerInput) {
        const speechText = 'Alright, Roshan just died. Thanks for the information.';
        return handlerInput.responseBuilder
            .speak(speechText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'Just say for example that roshan died. I will remember that for you.';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Rosh is dead!', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'Hope you won!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('GG', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Stopping timers for example? Do I need that, probably not. Oh well. It is here.
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

// The created Alexa skill instance
const skill = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        RoshanDiedIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler)
    .addErrorHandlers(ErrorHandler);

exports.handler = async function(event, context) {
    const response = await skill.invoke(event, context);
    console.log(`RESPONSE++++${JSON.stringify(response)}`);

    return response;
};