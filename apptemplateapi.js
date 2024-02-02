function submitTicket() {
    var firstName = $('#firstName').val();
    var lastName = $('#lastName').val();
    var email = $('#email').val();
    var description = $('#description').val();

    // Logique pour rechercher ou créer un 'Ticket' et l'ajouter à la liste de tickets (exemple fictif)
    var newTicket = {
        sujet: 'Sujet du ticket',
        description: description,
        dateSoumission: new Date().toLocaleString()
    };

    // Exemple de structure de données pour une réponse fictive de l'API
    var response = {
        success: true,
        message: 'Ticket soumis avec succès',
        ticket: newTicket
    };

    // Simulation d'une requête réussie à une API (à remplacer par votre appel API Salesforce réel)
    // Supprimez le code fictif ci-dessous et remplacez-le par votre appel API Salesforce
    setTimeout(function () {
        // Traitement de la réponse
        if (response.success) {
            console.log(response.message);
            // Ajoutez le ticket à la liste
            addTicketToTable(response.ticket);
            // Réinitialisez les champs du formulaire
            resetFormFields();
        } else {
            console.error(response.message);
            // Gérez les erreurs, par exemple en affichant un message d'erreur à l'utilisateur
        }
    }, 1000); // Simulation d'une latence de 1 seconde (supprimez cette ligne dans votre code réel)
}

// Fonction pour ajouter un ticket au tableau
function addTicketToTable(ticket) {
    var tableBody = $('#ticketsTableBody');
    var newRow = $('<tr>');
    newRow.append('<th scope="row">' + (tableBody.children().length + 1) + '</th>');
    newRow.append('<td>' + ticket.sujet + '</td>');
    newRow.append('<td>' + ticket.description + '</td>');
    newRow.append('<td>' + ticket.dateSoumission + '</td>');
    tableBody.append(newRow);
}

// Fonction pour réinitialiser les champs du formulaire
function resetFormFields() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#email').val('');
    $('#description').val('');
}
