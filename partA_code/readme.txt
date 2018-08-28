Documentation for IoT final project -- Group 7

File structure:
--readme.txt
--node-red (the Node-RED work flows for our project)
--AWS_Lambda_function
----LED_control (the Lambda functions for controling LED)
----temperature_control (the Lambda functions for controling temperature and humidity)
--Alexa_skills
----LED_skill (the skill file for LED control Alexa Skills Kit, as JSON format)
----temperature_skill (the skill file for temperature and humidity control Alexa Skills Kit, as JSON format)

The platform we used:
AWS Lambda:
Create the AWS Lambda function, add the Alexa Skills Kit as the trigger and the AWS IoT as the resource.
zip the code files and upload the function code.

AWS IoT:
Create new things for AWS IoT and publish topic.

Alexa Skills Kit:
Create the skills and upload the Alexa_skills files.

Node-RED:
Upload the node-red work flow file and deploy.

Raspberry Pi:
Connect with LED and temperature/humidity sensor.

