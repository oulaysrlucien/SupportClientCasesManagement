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


// Fonction pour rediriger l'utilisateur vers l'URL d'autorisation OAuth de Salesforce
$('#loginButton').click(function() {
    // Définissez ici l'URL d'autorisation OAuth de Salesforce
    var oauthUrl = 'https://anagra3-dev-ed.develop.my.salesforce.com/services/oauth2/authorize' +
        '?response_type=code' +
        '&client_id=3MVG9suI4ZYS8sz4_dZxCLGgLdDfXi7Tj8Q7t9GaD8fdWFhZxWhLqcvlAuvhMtOZaqN7E21hQRQ_f2U0hFowd' +
        '&redirect_uri=https://oulaysrlucien.github.io/SupportClientCasesManagement/'; // L'URL de rappel de votre portail

    // Redirigez l'utilisateur vers l'URL d'autorisation OAuth de Salesforce
    window.location.href = oauthUrl;
});

// Fonction pour échanger le code d'autorisation contre un jeton d'accès OAuth
function exchangeCodeForAccessToken(code) {
    // Paramètres nécessaires pour l'échange du code d'autorisation
    var tokenEndpoint = 'https://anagra3-dev-ed.develop.my.salesforce.com/services/oauth2/token'; // L'endpoint de l'échange de jeton OAuth
    var client_id = '3MVG9suI4ZYS8sz4_dZxCLGgLdDfXi7Tj8Q7t9GaD8fdWFhZxWhLqcvlAuvhMtOZaqN7E21hQRQ_f2U0hFowd'; // Remplacez VOTRE_CONSUMER_KEY par votre Consumer Key Salesforce
    var client_secret = '88E3C67BB714AC343D1EFA699054DB1498C90695DA5087C0A6744A65615A5462F'; // Remplacez VOTRE_CONSUMER_SECRET par votre Consumer Secret Salesforce
    var redirect_uri = 'https://oulaysrlucien.github.io/SupportClientCasesManagement/'; // L'URL de rappel de votre portail
    var grant_type = 'authorization_code';
    
    // Les données à envoyer dans la requête POST pour l'échange du code d'autorisation
    var requestData = {
        code: code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uri,
        grant_type: grant_type
    };

    // Envoi de la requête POST pour l'échange du code d'autorisation
    $.ajax({
        url: tokenEndpoint,
        method: 'POST',
        data: requestData,
        dataType: 'json',
        success: function(response) {
            // Gestion de la réponse réussie (obtention du jeton d'accès)
            var access_token = response.access_token;
            var refresh_token = response.refresh_token;
            // Utilisez access_token pour effectuer des requêtes vers Salesforce au nom de l'utilisateur authentifié
            // Stockez access_token et refresh_token de manière sécurisée pour les utilisations futures
        },
        error: function(error) {
            // Gestion des erreurs lors de l'échange du code d'autorisation
            console.error('Erreur lors de l\'échange du code d\'autorisation', error);
            // Gérez les erreurs et affichez un message d'erreur à l'utilisateur si nécessaire
        }
    });
}

