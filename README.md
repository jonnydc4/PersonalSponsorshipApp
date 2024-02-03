# PersonalSponsorshipApp

## Collaborator Branching
### Through the terminal
1. Click on the code button to get an HTTP link or SSH key.
   ![BranchExample](https://github.com/jonnydc4/PersonalSponsorshipApp/assets/71983496/af2987ed-253e-489d-b076-862f9d0b6cc5)

2. Use the terminal to clone the repository.
   ![CloneExample](https://github.com/jonnydc4/PersonalSponsorshipApp/assets/71983496/4da53de7-bd53-43de-ae85-03c1fd9ea7a4)

3. Install dependencies using "npm i". (Important Note: you must do this for both the /server and the /client directories.)
   ![image](https://github.com/jonnydc4/PersonalSponsorshipApp/assets/71983496/d01a67f7-8f62-4e1a-9fcb-8d670737f0cc)

## Running the App
1. Run $ docker-compose up
2. Open the docker desktop to see the running containers
   
### Hot Reloading for Backend
Docker is now configured to monitor for changes made in your local server.js. When a change is made and saved it should automatically restart the container.
(Note: This works strictly in server.js. It does not monitor changes made to any file in the client directory.)

### Reloading for Front End Development.
The client directory holds our react front end, however, our backend only utilizes the build files in client/build. For that reason, if you wish to see any changes you make in the client directory, you must follow these steps:
1. Navigate to the client directory in the terminal and run "npm run watch".
   This new watch will monitor changes made to .js files in the client's src and src/components folders. On change, it will rebuild the build directory automatically.
2. Restarting the Docker node-app container.
   This should happen automatically when the build watch does its thing, but if it doesn't you will have to restart the container yourself.
   
   
## Docker Help
### Useful Commands
1. $ docker-compose up  
   
   This command will spin everything up for our app so that you don't have to download anything yourself onto your computer. It affords us tons of flexibility for development and makes creating and sharing our dev environment much easier.
   The con to using this command is that after its use your terminal will be used as a console to log everything for each container.
   To avoid this, it is better to use the -d flag ex.) $ docker-compose up -d

3. $ docker-compose down  
   
   This will take down the container you build using docker-compose up. (Note: This command does not delete images or volumes, so if desired, delete those manually for now until a workaround is found)

4. $ docker-compose build  
   
   This will rebuild the images specified in our docker-compose.yml. If docker-compose up -d is not working the way you want, try this command first and hopefully it will work as expected. This applies mostly to if you are editing the dockerfile or docker-compose.yml.
