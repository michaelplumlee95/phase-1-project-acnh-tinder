## Villager Card Application
This is a JavaScript application that generates random villager cards and allows users to like or dislike the displayed villagers. It also provides functionality to view and clear the liked and disliked villagers.

### Installation
Clone the repository: git clone https://github.com/your-repository.git
Navigate to the project directory: cd your-repository
Open the index.html file in a web browser.
Usage
When you open the application in a web browser, it will display a random villager card. You can click the "Next" button to like the current villager and generate a new random villager card. Clicking the "Left" button will dislike the current villager and also generate a new random villager card.

You can view the list of liked and disliked villagers by clicking the "Show Disliked" and "Show Liked" buttons, respectively. To clear the liked and disliked villagers, use the "Clear Disliked" and "Clear Liked" buttons.

### API
The application uses the ACNH Public API to fetch villager information. The API endpoint used is http://acnhapi.com/v1/villagers/{id}, where {id} is a randomly generated ID to retrieve a random villager's information.

### Database
The application maintains a list of liked and disliked villagers using a local JSON server. The liked villagers are stored in the liked endpoint (http://localhost:3000/liked), and the disliked villagers are stored in the disliked endpoint (http://localhost:3000/disliked).

### Development
If you want to modify or enhance the application, follow these steps:

Open the project directory in your preferred code editor.
Make the necessary changes to the JavaScript code.
Save the files.
Open the index.html file in a web browser to see the updated application.
Please note that you need to have a local JSON server running to handle the liked and disliked villagers. You can use tools like json-server to set up a local JSON server.

### Acknowledgments
This application uses the ACNH Public API to fetch villager information.
The application structure and styling are inspired by modern web design principles.
### License
This project is licensed under the MIT License.
