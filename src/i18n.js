(() => {
    const translations = {
        en: {
            instructions: 'Instructions',
            movement: 'Movement keys',
            drop: 'Drop item',
            pickup: 'Pick up item',
            buy: 'Buy items as a human',
            teleport: 'Teleport to spawn as a zombie',
            attack: 'Use item / attack',
            login: 'Log in',
            play: 'Play',
            connectedAs: 'Connected as',
            joinDiscord: 'Join us on',
            createAccount: 'Create account',
            close: 'Close',
            username: 'Username',
            password: 'Password',
            friends: 'Friends',
            requests: 'Requests',
            submitRequest: 'Submit request',
            settings: 'Settings',
            changeNickname: 'Change nickname',
            newName: 'New name',
            changePassword: 'Change password',
            currentPassword: 'Current password',
            newPassword: 'New password',
            profileColor: 'Profile color',
            profilePicture: 'Profile picture',
            send: 'Send',
            chatPlaceholder: 'Press Enter to chat...'
        },
        pt: {
            instructions: 'Instrucoes',
            movement: 'Teclas de movimento',
            drop: 'Soltar item',
            pickup: 'Pegar item',
            buy: 'Comprar itens como humano',
            teleport: 'Teleportar para o inicio como zumbi',
            attack: 'Usar item / atacar',
            login: 'Entrar',
            play: 'Jogar',
            connectedAs: 'Conectado como',
            joinDiscord: 'Junte-se a nos no',
            createAccount: 'Criar conta',
            close: 'Fechar',
            username: 'Usuario',
            password: 'Senha',
            friends: 'Amigos',
            requests: 'Pedidos',
            submitRequest: 'Enviar pedido',
            settings: 'Configuracoes',
            changeNickname: 'Alterar apelido',
            newName: 'Novo nome',
            changePassword: 'Alterar senha',
            currentPassword: 'Senha atual',
            newPassword: 'Nova senha',
            profileColor: 'Cor do perfil',
            profilePicture: 'Foto do perfil',
            send: 'Enviar',
            chatPlaceholder: 'Pressione Enter para conversar...'
        },
        es: {
            instructions: 'Instrucciones', movement: 'Teclas de movimiento', drop: 'Soltar objeto', pickup: 'Recoger objeto', buy: 'Comprar objetos como humano', teleport: 'Teletransportarse al inicio como zombi', attack: 'Usar objeto / atacar', login: 'Iniciar sesion', play: 'Jugar', connectedAs: 'Conectado como', joinDiscord: 'Unete en', createAccount: 'Crear cuenta', close: 'Cerrar', username: 'Usuario', password: 'Contrasena', friends: 'Amigos', requests: 'Solicitudes', submitRequest: 'Enviar solicitud', settings: 'Configuracion', changeNickname: 'Cambiar apodo', newName: 'Nuevo nombre', changePassword: 'Cambiar contrasena', currentPassword: 'Contrasena actual', newPassword: 'Nueva contrasena', profileColor: 'Color del perfil', profilePicture: 'Foto de perfil', send: 'Enviar', chatPlaceholder: 'Presiona Enter para chatear...'
        },
        fr: {
            instructions: 'Instructions', movement: 'Touches de mouvement', drop: 'Lacher objet', pickup: 'Ramasser objet', buy: 'Acheter des objets humain', teleport: 'Se teleporter au depart en zombie', attack: 'Utiliser objet / attaquer', login: 'Connexion', play: 'Jouer', connectedAs: 'Connecte en tant que', joinDiscord: 'Rejoignez-nous sur', createAccount: 'Creer un compte', close: 'Fermer', username: 'Nom utilisateur', password: 'Mot de passe', friends: 'Amis', requests: 'Demandes', submitRequest: 'Envoyer la demande', settings: 'Parametres', changeNickname: 'Changer le pseudo', newName: 'Nouveau nom', changePassword: 'Changer le mot de passe', currentPassword: 'Mot de passe actuel', newPassword: 'Nouveau mot de passe', profileColor: 'Couleur du profil', profilePicture: 'Photo de profil', send: 'Envoyer', chatPlaceholder: 'Appuyez sur Entree pour discuter...'
        },
        de: {
            instructions: 'Anleitung', movement: 'Bewegungstasten', drop: 'Gegenstand ablegen', pickup: 'Gegenstand aufnehmen', buy: 'Gegenstaende als Mensch kaufen', teleport: 'Als Zombie zum Start teleportieren', attack: 'Gegenstand nutzen / angreifen', login: 'Anmelden', play: 'Spielen', connectedAs: 'Verbunden als', joinDiscord: 'Besuche uns auf', createAccount: 'Konto erstellen', close: 'Schliessen', username: 'Benutzername', password: 'Passwort', friends: 'Freunde', requests: 'Anfragen', submitRequest: 'Anfrage senden', settings: 'Einstellungen', changeNickname: 'Spitznamen aendern', newName: 'Neuer Name', changePassword: 'Passwort aendern', currentPassword: 'Aktuelles Passwort', newPassword: 'Neues Passwort', profileColor: 'Profilfarbe', profilePicture: 'Profilbild', send: 'Senden', chatPlaceholder: 'Enter zum Chatten druecken...'
        }
    };

    const dynamicTranslations = {
        en: {
            fieldsRequired: 'Please fill in all fields.', invalidName: 'Name must contain 3 to 24 letters, numbers, spaces or underscores.', invalidPassword: 'Password must contain 8 to 128 characters.', accountCreated: 'Account created successfully. You can now log in.', loggedIn: 'Welcome, {name}!', needLogin: 'You must log in to play.', waitingState: 'Waiting for game state...', ranking: 'Ranking', trapped: 'TRAPPED!', roundStarts: 'The round starts in...', restarting: 'Restarting in: {seconds}', roundEnd: 'End of round!', infectHumans: 'INFECT HUMANS!', survive: 'SURVIVE!', speed: 'SPEED', chatNotice: 'New message from {name}', friendRequestSent: 'Friend request sent!', friendRequestReceived: 'Friend request from {name}', friendsNow: 'You and {name} are now friends!', photoUpdated: 'Profile photo updated!', nameUpdated: 'Name updated. Please log in again with the new name.', passwordUpdated: 'Password changed successfully.', noPermission: 'You must be logged in.', userNotFound: 'Player not found.', cannotSelf: 'You cannot send a request to yourself.'
        },
        pt: {
            fieldsRequired: 'Preencha todos os campos.', invalidName: 'O nome deve ter de 3 a 24 letras, numeros, espacos ou sublinhados.', invalidPassword: 'A senha deve ter entre 8 e 128 caracteres.', accountCreated: 'Conta criada com sucesso. Agora voce pode entrar.', loggedIn: 'Bem-vindo, {name}!', needLogin: 'Voce precisa entrar para jogar.', waitingState: 'Aguardando estado do jogo...', ranking: 'Ranking', trapped: 'PRESO!', roundStarts: 'A rodada comeca em...', restarting: 'Reiniciando em: {seconds}', roundEnd: 'Fim da rodada!', infectHumans: 'INFECTE OS HUMANOS!', survive: 'SOBREVIVA!', speed: 'VELOCIDADE', chatNotice: 'Nova mensagem de {name}', friendRequestSent: 'Pedido de amizade enviado!', friendRequestReceived: 'Pedido de amizade de {name}', friendsNow: 'Voce e {name} agora sao amigos!', photoUpdated: 'Foto de perfil atualizada!', nameUpdated: 'Nome alterado. Entre novamente com o novo nome.', passwordUpdated: 'Senha alterada com sucesso.', noPermission: 'Voce precisa estar conectado.', userNotFound: 'Jogador nao encontrado.', cannotSelf: 'Voce nao pode enviar um pedido para si mesmo.'
        },
        es: {
            fieldsRequired: 'Completa todos los campos.', invalidName: 'El nombre debe tener de 3 a 24 letras, numeros, espacios o guiones bajos.', invalidPassword: 'La contrasena debe tener entre 8 y 128 caracteres.', accountCreated: 'Cuenta creada. Ahora puedes iniciar sesion.', loggedIn: 'Bienvenido, {name}!', needLogin: 'Debes iniciar sesion para jugar.', waitingState: 'Esperando el estado del juego...', ranking: 'Clasificacion', trapped: 'ATRAPADO!', roundStarts: 'La ronda comienza en...', restarting: 'Reiniciando en: {seconds}', roundEnd: 'Fin de la ronda!', infectHumans: 'INFECTA A LOS HUMANOS!', survive: 'SOBREVIVE!', speed: 'VELOCIDAD', chatNotice: 'Nuevo mensaje de {name}', friendRequestSent: 'Solicitud enviada!', friendRequestReceived: 'Solicitud de {name}', friendsNow: 'Tu y {name} ahora son amigos!', photoUpdated: 'Foto de perfil actualizada!', nameUpdated: 'Nombre cambiado. Inicia sesion de nuevo.', passwordUpdated: 'Contrasena cambiada.', noPermission: 'Debes iniciar sesion.', userNotFound: 'Jugador no encontrado.', cannotSelf: 'No puedes enviarte una solicitud.'
        },
        fr: {
            fieldsRequired: 'Remplissez tous les champs.', invalidName: 'Le nom doit contenir 3 a 24 lettres, chiffres, espaces ou tirets bas.', invalidPassword: 'Le mot de passe doit contenir 8 a 128 caracteres.', accountCreated: 'Compte cree. Vous pouvez maintenant vous connecter.', loggedIn: 'Bienvenue, {name} !', needLogin: 'Vous devez vous connecter pour jouer.', waitingState: 'En attente de letat du jeu...', ranking: 'Classement', trapped: 'PIEGE !', roundStarts: 'La manche commence dans...', restarting: 'Redemarrage dans : {seconds}', roundEnd: 'Fin de la manche !', infectHumans: 'INFECTEZ LES HUMAINS !', survive: 'SURVIVEZ !', speed: 'VITESSE', chatNotice: 'Nouveau message de {name}', friendRequestSent: 'Demande envoyee !', friendRequestReceived: 'Demande de {name}', friendsNow: 'Vous et {name} etes maintenant amis !', photoUpdated: 'Photo de profil mise a jour !', nameUpdated: 'Nom modifie. Reconnectez-vous avec le nouveau nom.', passwordUpdated: 'Mot de passe modifie.', noPermission: 'Vous devez vous connecter.', userNotFound: 'Joueur introuvable.', cannotSelf: 'Vous ne pouvez pas vous envoyer une demande.'
        },
        de: {
            fieldsRequired: 'Bitte alle Felder ausfuellen.', invalidName: 'Der Name muss 3 bis 24 Buchstaben, Zahlen, Leerzeichen oder Unterstriche enthalten.', invalidPassword: 'Das Passwort muss 8 bis 128 Zeichen enthalten.', accountCreated: 'Konto erstellt. Du kannst dich jetzt anmelden.', loggedIn: 'Willkommen, {name}!', needLogin: 'Du musst dich zum Spielen anmelden.', waitingState: 'Warte auf den Spielstatus...', ranking: 'Rangliste', trapped: 'GEFANGEN!', roundStarts: 'Die Runde beginnt in...', restarting: 'Neustart in: {seconds}', roundEnd: 'Rundenende!', infectHumans: 'MENSCHEN INFIZIEREN!', survive: 'UEBERLEBEN!', speed: 'GESCHWINDIGKEIT', chatNotice: 'Neue Nachricht von {name}', friendRequestSent: 'Freundschaftsanfrage gesendet!', friendRequestReceived: 'Anfrage von {name}', friendsNow: 'Du und {name} seid jetzt Freunde!', photoUpdated: 'Profilbild aktualisiert!', nameUpdated: 'Name geaendert. Bitte erneut anmelden.', passwordUpdated: 'Passwort geaendert.', noPermission: 'Du musst angemeldet sein.', userNotFound: 'Spieler nicht gefunden.', cannotSelf: 'Du kannst dir selbst keine Anfrage senden.'
        }
    };

    let language = localStorage.getItem('zomz-language') || 'en';
    const translate = (key, variables = {}) => {
        let value = dynamicTranslations[language]?.[key] || translations[language]?.[key] || dynamicTranslations.en[key] || translations.en[key] || key;
        return value.replace(/\{(\w+)\}/g, (_, name) => variables[name] ?? `{${name}}`);
    };

    const legacyMessages = {
        '⚠️ Preencha todos os campos!': 'fieldsRequired',
        'O nome deve ter entre 3 e 24 caracteres.': 'invalidName',
        'A senha deve ter entre 8 e 128 caracteres.': 'invalidPassword',
        '✅ Conta criada com sucesso! Agora faça login.': 'accountCreated',
        '⚠️ Você precisa fazer login para jogar!': 'needLogin',
        '⚠️ Você precisa estar logado!': 'noPermission',
        '⚠️ Você precisa estar logado para adicionar amigos!': 'noPermission',
        '⚠️ Insira uma URL!': 'fieldsRequired',
        '⚠️ Insira um novo nome!': 'fieldsRequired',
        '⚠️ Insira uma nova senha!': 'fieldsRequired',
        '⚠️ Insira o nome de um jogador!': 'fieldsRequired',
        '⚠️ Não pode enviar para você mesmo': 'cannotSelf',
        '❌ Jogador não existe': 'userNotFound',
        '📩 Pedido enviado!': 'friendRequestSent',
        '✅ Foto de perfil atualizada!': 'photoUpdated',
        '✅ Nome alterado! Faça login novamente com o novo nome.': 'nameUpdated',
        '✅ Senha alterada com sucesso!': 'passwordUpdated',
        'Waiting for game state...': 'waitingState',
        'Ranking': 'ranking'
    };

    window.translateLegacy = text => {
        const key = legacyMessages[text];
        if (key) return translate(key);
        const friendRequest = text.match(/^(?:📩 )?Pedido de amizade de (.+)$/);
        if (friendRequest) return translate('friendRequestReceived', { name: friendRequest[1] });
        const accepted = text.match(/^🤝 Você e (.+) agora são amigos!$/);
        if (accepted) return translate('friendsNow', { name: accepted[1] });
        const chat = text.match(/^💬 Nova mensagem de (.+)$/);
        if (chat) return translate('chatNotice', { name: chat[1] });
        const welcome = text.match(/^🎉 Login realizado! Bem-vindo, (.+)!$/);
        if (welcome) return translate('loggedIn', { name: welcome[1] });
        return text;
    };

    function applyTranslations() {
        document.documentElement.lang = language === 'pt' ? 'pt-BR' : language;
        document.querySelectorAll('[data-i18n]').forEach(element => {
            element.textContent = translate(element.dataset.i18n);
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            element.placeholder = translate(element.dataset.i18nPlaceholder);
        });
        document.querySelectorAll('[data-language-selector]').forEach(element => {
            element.value = language;
        });
    }

    window.t = translate;
    window.setLanguage = nextLanguage => {
        if (!translations[nextLanguage]) return;
        language = nextLanguage;
        localStorage.setItem('zomz-language', language);
        applyTranslations();
        window.dispatchEvent(new CustomEvent('languagechange', { detail: language }));
    };

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-language-selector]').forEach(element => {
            element.addEventListener('change', event => window.setLanguage(event.target.value));
        });
        applyTranslations();
    });
})();
