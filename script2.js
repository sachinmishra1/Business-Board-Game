document.addEventListener("DOMContentLoaded", function () {
  // Retrieve player data from localStorage
  const storedPlayers = JSON.parse(localStorage.getItem("players"));

  // Function to populate the "From" and "To" dropdowns in the transaction container
  function populateSenderReceiverDropdowns() {
    const senderDropdown = document.getElementById("sender");
    const receiverDropdown = document.getElementById("receiver");

    // Clear previous options
    senderDropdown.innerHTML = "";
    receiverDropdown.innerHTML = "";

    // Populate dropdowns with player names
    storedPlayers.forEach((player) => {
      const option = document.createElement("option");
      option.value = player.name;
      option.text = player.name;
      senderDropdown.appendChild(option.cloneNode(true));
      receiverDropdown.appendChild(option);
    });
  }

  // Function to update the transaction history
  // function updateTransactionHistory(sender, receiver, amount) {
  //   const transactionHistory = document.getElementById("transactionHistory");
  //   const listItem = document.createElement("li");
  //   listItem.textContent = `${sender} sent $${amount} to ${receiver}`;
  //   transactionHistory.appendChild(listItem);
  // }

  function updateTransactionHistory(sender, receiver, amount) {
    const transactionHistory = document.getElementById("transactionHistory");
    const listItem = document.createElement("li");
    listItem.textContent = `${sender} sent $${amount} to ${receiver}`;
  
    // Insert the new item as the first child of the transactionHistory list
    if (transactionHistory.firstChild) {
      transactionHistory.insertBefore(listItem, transactionHistory.firstChild);
    } else {
      transactionHistory.appendChild(listItem);
    }
  }
  // Function to handle transactions
  function handleTransaction() {
    const senderDropdown = document.getElementById("sender");
    const receiverDropdown = document.getElementById("receiver");
    const sendButton = document.getElementById("sendButton");

    sendButton.addEventListener("click", () => {
      const senderName = senderDropdown.value;
      const receiverName = receiverDropdown.value;
      const amount = document.getElementById("amount").value;

      if (senderName === receiverName) {
        alert("Sender and receiver cannot be the same.");
        return;
      }

      if (isNaN(amount) || amount <= 0) {
        alert("Invalid amount.");
        return;
      }

      const senderPlayer = storedPlayers.find(
        (player) => player.name === senderName
      );
      const receiverPlayer = storedPlayers.find(
        (player) => player.name === receiverName
      );

      // Deduct amount from sender and add to receiver
      senderPlayer.amount -= amount;
      receiverPlayer.amount =
        parseInt(receiverPlayer.amount) + parseInt(amount);

      // Update the leaderboard
      updateLeaderboard(storedPlayers);

      // Update transaction history
      updateTransactionHistory(senderName, receiverName, amount);

      // Save updated player data to localStorage
      localStorage.setItem("players", JSON.stringify(storedPlayers));
    });
  }

  // Function to populate and update the leaderboard
  function updateLeaderboard(players) {
    if (players && players.length > 0) {
      players.sort((a, b) => b.amount - a.amount);
      const leaderboardBody = document.getElementById("leaderboardBody");
      leaderboardBody.innerHTML = ""; // Clear previous rows

      players.forEach((player, index) => {
        const row = document.createElement("tr");
        row.style.backgroundColor = player.color; // Set the row background color based on player's choice
        if (
          player.color != "Yellow" &&
          player.color != "Orange" &&
          player.color != "Pink"
        )
          row.style.color = "white";

        row.innerHTML = `
                <td>${player.name}</td>
                <td>${player.color}</td>
                <td>${player.amount}</td>
            `;
        leaderboardBody.appendChild(row);
      });
    } else {
      console.log("No player data found.");
    }
  }

  // Handle "New Game" button click
  const newGameButton = document.getElementById("newGameButton");
  newGameButton.addEventListener("click", function () {
      const confirmNewGame = confirm("Do you really want to start a new game? All progress will be lost.");
      if (confirmNewGame) {
          // Clear data from Local Storage
          localStorage.removeItem("players");
          // Redirect to index.html
          window.location.href = "index.html";
      }
  });
  
  updateLeaderboard(storedPlayers);
  populateSenderReceiverDropdowns();
  // Call the function to populate the leaderboard with stored player data
  handleTransaction();
  updateLeaderboard(storedPlayers);
});
