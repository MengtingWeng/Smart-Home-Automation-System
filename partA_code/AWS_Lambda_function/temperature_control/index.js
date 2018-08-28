/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * App ID for the skill
 */

var APP_ID = "amzn1.ask.skill.b351b886-2f23-45a0-8923-b561eb080f6c";   //for TempSkill
/*****/
//Environment Configuration
var config = {};
config.IOT_BROKER_ENDPOINT      = "a3rzwyuyskpvz8.iot.us-east-1.amazonaws.com".toLowerCase();
config.IOT_BROKER_REGION        = "us-east-1";
config.IOT_THING_NAME           = "temperature";
//Loading AWS SDK libraries
var AWS = require('aws-sdk');
AWS.config.region = config.IOT_BROKER_REGION;
//Initializing client for IoT
var iotData = new AWS.IotData({endpoint: config.IOT_BROKER_ENDPOINT});

var AlexaSkill = require('./AlexaSkill');

var TempSkill = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
TempSkill.prototype = Object.create(AlexaSkill.prototype);
TempSkill.prototype.constructor = TempSkill;

TempSkill.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("TempSkill onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

TempSkill.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("TempSkill onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Alexa Skills Kit, you can say hello";
    var repromptText = "You can say hello";
    response.ask(speechOutput, repromptText);
};

TempSkill.prototype.eventHandlers.onLaunch = function (intentRequest, session, response) {
    console.log("TempSkill onintent requestId: " + intentRequest.requestId + ", sessionId: " + session.sessionId);
    var intent = intentRequest.intent;
    var intentName = intentRequest.intent.name;
};

TempSkill.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("TempSkill onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

TempSkill.prototype.intentHandlers = {
    // register custom intent handlers
    "GetTemperature": function (intent, session, response) {
        //response.tellWithCard("Hello World!", "Hello World", "Hello World!");
        console.log("FB started");
        /****/
        var repromptText = null;
        var sessionAttributes = {};
        var shouldEndSession = true;
        var speechOutput = "";
        var payloadObj=1; //On
        //Prepare the parameters of the update call
        var params = {
          thingName: "temperature" /* required */
        };

        var paramsUpdate = {
            topic:"/temperature",
            payload: JSON.stringify(payloadObj),
            qos:0
        };
        iotData.publish(paramsUpdate, function(err, data) {
          // if (err){
          //   //Handle the error here
          //   console.log("MQTT Error" + data);
          // }
          // else {
          //   speechOutput = "Turning led on now.";
          //   console.log(data);
          //   response.tell(speechOutput);
          //   //callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
          // }    
        });

        iotData.getThingShadow(params, function(err, data) {
            if (err)  {
               console.log(err, err.stack); // an error occurred
            } else {
               //console.log(data.payload);           // successful response
               var payload = JSON.parse(data.payload);
               var temp = payload.state.reported.temp;
            }

            speechOutput = "The current room temperature is " + temp + " degrees celcius";
            //callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
            console.log(data);
            response.tell(speechOutput);
        });
    },

    "GetHumidity": function (intent, session, response) {
        //response.tellWithCard("Hello World!", "Hello World", "Hello World!");
        console.log("FB started");
        /****/
        var repromptText = null;
        var sessionAttributes = {};
        var shouldEndSession = true;
        var speechOutput = "";
        var payloadObj=1; //On
        //Prepare the parameters of the update call
        var params = {
          thingName: "temperature" /* required */
        };

        iotData.getThingShadow(params, function(err, data) {
            if (err)  {
               console.log(err, err.stack); // an error occurred
            } else {
               //console.log(data.payload);           // successful response
               var payload = JSON.parse(data.payload);
               var humid = payload.state.reported.humid;
            }

            speechOutput = "The current room humidity is " + humid + " percent";
            //callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
            console.log(data);
            response.tell(speechOutput);
        });
    },

    "GetCondition": function (intent, session, response) {
        //response.tellWithCard("Hello World!", "Hello World", "Hello World!");
        console.log("FB started");
        /****/
        var repromptText = null;
        var sessionAttributes = {};
        var shouldEndSession = true;
        var speechOutput = "";
        var payloadObj=1; //On
        //Prepare the parameters of the update call
        var params = {
          thingName: "temperature" /* required */
        };

        iotData.getThingShadow(params, function(err, data) {
            if (err)  {
               console.log(err, err.stack); // an error occurred
            } else {
               //console.log(data.payload);           // successful response
               var payload = JSON.parse(data.payload);
               var humid = payload.state.reported.humid;
               var temp = payload.state.reported.temp;
            }

            speechOutput = "The current room temperature is " + temp + " degrees celcius. The current room humidity is " + humid + " percent";
            //callback(sessionAttributes,buildSpeechletResponse(intent.name, speechOutput, repromptText, shouldEndSession));
            console.log(data);
            response.tell(speechOutput);
        });
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask me the current room temperature", "You can ask me the current room humidity", "You can ask me the current room condition");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the TempSkill skill.
    var turnLight = new TempSkill();
    turnLight.execute(event, context);
};

// function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
//     return {
//         outputSpeech: {
//             type: "PlainText",
//             text: output
//         },
//         card: {
//             type: "Simple",
//             title: "SessionSpeechlet - " + title,
//             content: "SessionSpeechlet - " + output
//         },
//         reprompt: {
//             outputSpeech: {
//                 type: "PlainText",
//                 text: repromptText
//             }
//         },
//         shouldEndSession: shouldEndSession
//     }
// }
