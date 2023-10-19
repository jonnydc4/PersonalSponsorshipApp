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
1. Rebuild the react static/build files.
   In the terminal under the client directory run $ npm run build    
2. Restart the node-app container in docker.
   You can do this either manually in the docker desktop or make a small change to server.js and save it so the container restarts automatically.
   
   
