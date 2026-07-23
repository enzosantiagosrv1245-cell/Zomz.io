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

    let language = localStorage.getItem('zomz-language') || 'en';
    const translate = key => (translations[language] && translations[language][key]) || translations.en[key] || key;

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
