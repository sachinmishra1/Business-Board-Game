document.addEventListener("DOMContentLoaded", function () {
    const playerCountInput = document.getElementById("playerCount");
    const amtInput = document.getElementById("amt");
    const playerInfoInputs = document.getElementById("playerInfoInputs");
    const startGameButton = document.getElementById("startGame");

    // Function to generate input fields for player names and color selections based on the player count
    // Inside the `generatePlayerInputs` function
function generatePlayerInputs(count) {
    playerInfoInputs.innerHTML = ""; // Clear previous inputs
    const availableColors = ["Red", "Green", "Blue", "Yellow", "Pink", "Orange"];

    for (let i = 1; i <= count; i++) {
        // Create a container div for each player
        const playerContainer = document.createElement("div");
        playerContainer.classList.add("player-container");

        // Create input field for player name
        const playerNameInput = document.createElement("input");
        playerNameInput.setAttribute("type", "text");
        playerNameInput.setAttribute("placeholder", `Player ${i} Name`);
        playerNameInput.setAttribute("required", "");

        // Create select element for color selection
        const playerColorSelect = document.createElement("select");
        playerColorSelect.setAttribute("id", `playerColor${i}`);
        
        // Add a default "Select Color" option
        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.text = "Select Color";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        playerColorSelect.appendChild(defaultOption);

        // Populate the dropdown with available colors
        availableColors.forEach(color => {
            const option = document.createElement("option");
            option.value = color;
            option.text = color;
            playerColorSelect.appendChild(option);
        });

        // Add an event listener to prevent duplicate color selections
        playerColorSelect.addEventListener("change", () => {
            const selectedColor = playerColorSelect.value;
            const index = availableColors.indexOf(selectedColor);
            if (index !== -1) {
                availableColors.splice(index, 1);
            }
            // Remove the selected color from other dropdowns
            const allColorSelects = document.querySelectorAll("select");
            allColorSelects.forEach(select => {
                if (select !== playerColorSelect) {
                    const optionToRemove = select.querySelector(`option[value="${selectedColor}"]`);
                    if (optionToRemove) {
                        select.removeChild(optionToRemove);
                    }
                }
            });
        });

        // Append the player name and color elements to the container
        playerContainer.appendChild(playerNameInput);
        playerContainer.appendChild(playerColorSelect);

        // Append the player container to the main container
        playerInfoInputs.appendChild(playerContainer);
    }
}

    startGameButton.addEventListener("click", () => {
        const playerCount = parseInt(playerCountInput.value);
        const amount = parseFloat(amtInput.value);
        const players = [{
            name: "Bank",
            color: "Black",
            amount: 0
        }];
        console.log(players);
        
        for (let i = 1; i <= playerCount; i++) {
            const playerNameInput = document.querySelector(`#playerInfoInputs .player-container:nth-child(${i}) input[type="text"]`);
            const playerColorSelect = document.querySelector(`#playerInfoInputs .player-container:nth-child(${i}) select`);
            players.push({
                name: playerNameInput.value,
                color: playerColorSelect.value,
                amount: amount
            });
        }
        console.log(players);


        // Save player data to localStorage
        localStorage.setItem("players", JSON.stringify(players));

        // Redirect to the leaderboard page
        window.location.href = "leaderboard.html";
    });

    // Update player inputs when the player count changes
    playerCountInput.addEventListener("change", () => {
        const count = parseInt(playerCountInput.value);
        generatePlayerInputs(count);
    });

    // Initialize player inputs based on the default player count value
    generatePlayerInputs(parseInt(playerCountInput.value));
});
