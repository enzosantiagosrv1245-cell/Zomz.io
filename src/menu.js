document.addEventListener("DOMContentLoaded", () => {
    // --- Referências aos novos elementos do menu ---
    const menuUiContainer = document.getElementById('menu-ui-container');
    const loginSection = document.getElementById('login-section');
    const playSection = document.getElementById('play-section');
    const playGameBtn = document.getElementById('playGameBtn');
    const guestPlayBtn = document.getElementById('guestPlayBtn');
    const playerNameDisplay = document.getElementById('playerName');

// The old menu background animation is no longer needed.
    // drawCanvas() was removed.

    const SESSION_TOKEN_KEY = 'zomz-session-token';
    let currentUser = null;
    let userProfile = null;
    let linkQueue = [];
    let menuProfileIcon = null;
    let menuProfilePanel = null;
    let menuProfileOverlay = null; // Dark overlay background
    let commandListPanel = null;

    function storeSessionToken(token) {
        if (typeof token === 'string' && token.length > 0) {
            localStorage.setItem(SESSION_TOKEN_KEY, token);
        } else {
            localStorage.removeItem(SESSION_TOKEN_KEY);
        }
    }

    function clearSessionToken() {
        localStorage.removeItem(SESSION_TOKEN_KEY);
    }

    function ensureCommandListPanel() {
        if (commandListPanel) return commandListPanel;
        commandListPanel = document.createElement('div');
        commandListPanel.style.position = 'fixed';
        commandListPanel.style.top = '20px';
        commandListPanel.style.left = '20px';
        commandListPanel.style.width = '260px';
        commandListPanel.style.maxHeight = '40vh';
        commandListPanel.style.overflow = 'auto';
        commandListPanel.style.background = 'rgba(10, 10, 15, 0.95)';
        commandListPanel.style.border = '1px solid #2d2d34';
        commandListPanel.style.borderRadius = '8px';
        commandListPanel.style.color = 'white';
        commandListPanel.style.padding = '10px';
        commandListPanel.style.fontFamily = 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif';
        commandListPanel.style.fontSize = '12px';
        commandListPanel.style.zIndex = '2600';
        commandListPanel.style.display = 'none';
        commandListPanel.innerHTML = '<div style="font-weight:bold; margin-bottom:8px;">Available commands</div>';
        document.body.appendChild(commandListPanel);
        return commandListPanel;
    }

    function applyCommandList(enabled, commands) {
        const panel = ensureCommandListPanel();
        if (!enabled) {
            panel.style.display = 'none';
            return;
        }

        const list = Array.isArray(commands) ? commands : [];
        panel.innerHTML = `<div style="font-weight:bold; margin-bottom:8px;">Available commands</div>${list.map(cmd => `<div style="margin:6px 0;">${cmd}</div>`).join('')}`;
        panel.style.display = 'block';
    }

    // =================================================================
    // --- CÓDIGO MODIFICADO: Perfil do Menu ---
    // (O seu código de criação de perfil permanece o mesmo, sem alterações)
    // =================================================================
    function createMenuProfile() {
        // Create the profile icon
        menuProfileIcon = document.createElement("div");
        menuProfileIcon.style.position = 'fixed';
        menuProfileIcon.style.top = '20px';
        menuProfileIcon.style.right = '20px';
        menuProfileIcon.style.width = '50px';
        menuProfileIcon.style.height = '50px';
        menuProfileIcon.style.backgroundColor = '#00FFFF';
        menuProfileIcon.style.borderRadius = '50%';
        menuProfileIcon.style.cursor = 'pointer';
        menuProfileIcon.style.zIndex = '2000';
menuProfileIcon.title = 'User settings';
        menuProfileIcon.style.display = 'none'; // Starts hidden and appears after login
        document.body.appendChild(menuProfileIcon);

        // Create the dark overlay background
        menuProfileOverlay = document.createElement('div');
        menuProfileOverlay.style.display = 'none';
        menuProfileOverlay.style.position = 'fixed';
        menuProfileOverlay.style.top = '0';
        menuProfileOverlay.style.left = '0';
        menuProfileOverlay.style.width = '100%';
        menuProfileOverlay.style.height = '100%';
        menuProfileOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        menuProfileOverlay.style.zIndex = '2499';
        document.body.appendChild(menuProfileOverlay);

        // Create the hidden profile panel
        menuProfilePanel = document.createElement('div');
        menuProfilePanel.style.display = 'none'; // Oculto por padrão
        menuProfilePanel.style.position = 'fixed';
        menuProfilePanel.style.top = '50%';
        menuProfilePanel.style.left = '50%';
        menuProfilePanel.style.transform = 'translate(-50%, -50%)';
        menuProfilePanel.style.width = '420px';
        menuProfilePanel.style.maxHeight = '90vh';
        menuProfilePanel.style.overflowY = 'auto';
        menuProfilePanel.style.backgroundColor = '#1e1e22';
        menuProfilePanel.style.borderRadius = '15px';
        menuProfilePanel.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        menuProfilePanel.style.zIndex = '2500';
        menuProfilePanel.style.padding = '25px';
        menuProfilePanel.style.boxSizing = 'border-box';
        menuProfilePanel.style.color = 'white';
        menuProfilePanel.style.fontFamily = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
        menuProfilePanel.style.display = 'none';
        menuProfilePanel.style.flexDirection = 'column';
        menuProfilePanel.style.gap = '25px';
        menuProfilePanel.style.border = '1px solid #3a3a3e';

        // --- CONTEÚDO DO PAINEL ---
        menuProfilePanel.innerHTML = `
            <style>
                .profile-section { background-color: #2a2a2e; padding: 15px; border-radius: 10px; }
                .profile-section label { display: block; margin-bottom: 10px; color: #e0e0e0; font-size: 14px; }
                .profile-input { width: 100%; background: #3a3a3e; border: 1px solid #4a4a4e; color: white; padding: 10px; border-radius: 5px; box-sizing: border-box; }
                .profile-btn { background-color: #2ecc71; border: none; color: white; padding: 10px 15px; border-radius: 5px; cursor: pointer; transition: background-color 0.2s; font-weight: bold; }
                .profile-btn:hover { background-color: #27ae60; }
            </style>
            
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <h2 style="margin: 0; color: #2ecc71;">Settings</h2>
                <button id="closeMenuProfilePanel" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer;">&times;</button>
            </div>

            <div style="display: flex; align-items: center; gap: 20px; background-color: #2a2a2e; padding: 20px; border-radius: 10px;">
                <div id="menuProfilePic" style="width: 70px; height: 70px; border-radius: 50%; background-color: #3a3a3e; background-size: cover; background-position: center; border: 2px solid #2ecc71;"></div>
                <span id="menuUsernameDisplay" style="font-size: 20px; font-weight: bold;">Guest</span>
            </div>

            <div class="profile-section">
                <label>📷 Profile photo (URL)</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="menuPhotoInput" class="profile-input" placeholder="https://example.com/image.png">
                    <button id="menuChangePhotoBtn" class="profile-btn">Save</button>
                </div>
            </div>

            <div class="profile-section">
                <label>👤 Change username</label>
                 <div style="display: flex; gap: 10px;">
                    <input type="text" id="menuNameInput" class="profile-input" placeholder="New nickname">
                    <button id="menuChangeNameBtn" class="profile-btn">Save</button>
                </div>
            </div>

            <div class="profile-section">
                <label>🔒 Change password</label>
                <div style="display: flex; gap: 10px;">
                    <input type="password" id="menuPasswordInput" class="profile-input" placeholder="New password">
                    <button id="menuChangePasswordBtn" class="profile-btn">Save</button>
                </div>
            </div>
            
            <div class="profile-section">
                <label>🤝 Add friend</label>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="menuFriendInput" class="profile-input" placeholder="Player name">
                    <button id="menuAddFriendBtn" class="profile-btn">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(menuProfilePanel);

        // --- LÓGICA DOS BOTÕES E EVENTOS ---

        // Abrir painel
        menuProfileIcon.addEventListener('click', () => {
            if (currentUser && userProfile) {
                document.getElementById('menuUsernameDisplay').textContent = currentUser;
                document.getElementById('menuPhotoInput').value = userProfile.photo || '';
                const profilePic = document.getElementById('menuProfilePic');
                if (userProfile.photo) {
                    profilePic.style.backgroundImage = `url('${userProfile.photo}')`;
                } else {
                    profilePic.style.backgroundImage = 'none';
                }
            }
            menuProfilePanel.style.display = 'flex';
            menuProfileOverlay.style.display = 'block';
        });

        const closePanel = () => {
            menuProfilePanel.style.display = 'none';
            menuProfileOverlay.style.display = 'none';
        }

        // Close panel
        document.getElementById('closeMenuProfilePanel').addEventListener('click', closePanel);
        menuProfileOverlay.addEventListener('click', closePanel);


        // Save photo
        document.getElementById('menuChangePhotoBtn').addEventListener('click', () => {
            if (!currentUser) return showNotification("⚠️ You need to be logged in!", "red");
            const photoUrl = document.getElementById('menuPhotoInput').value.trim();
            if (!photoUrl) return showNotification("⚠️ Enter a URL!", "red");
            socket.emit("changePhoto", {
                username: currentUser,
                photo: photoUrl
            });
            document.getElementById('menuProfilePic').style.backgroundImage = `url('${photoUrl}')`;
            userProfile.photo = photoUrl; // Atualiza localmente
            showNotification("✅ Profile photo updated!", "green");
        });

        // Save name
        document.getElementById('menuChangeNameBtn').addEventListener('click', () => {
            if (!currentUser) return showNotification("⚠️ You need to be logged in!", "red");
            const newName = document.getElementById('menuNameInput').value.trim();
            if (!newName) return showNotification("⚠️ Enter a new name!", "red");
            socket.emit("changeName", {
                oldName: currentUser,
                newName: newName
            });
            showNotification("✅ Name changed. Please log in again with the new name.", "blue");
            setTimeout(() => location.reload(), 2000);
        });

        // Save password
        document.getElementById('menuChangePasswordBtn').addEventListener('click', () => {
            if (!currentUser) return showNotification("⚠️ You need to be logged in!", "red");
            const newPass = document.getElementById('menuPasswordInput').value.trim();
            if (!newPass) return showNotification("⚠️ Enter a new password!", "red");
            socket.emit("changePassword", {
                username: currentUser,
                newPass: newPass
            });
            showNotification("✅ Password changed successfully!", "green");
        });

        // Add friend
        document.getElementById('menuAddFriendBtn').addEventListener('click', () => {
if (!currentUser) return showNotification("⚠️ You need to be logged in to add friends!", "red");
            const target = document.getElementById('menuFriendInput').value.trim();
            if (!target) return showNotification("⚠️ Enter a player name!", "red");
            if (target === currentUser) return showNotification("⚠️ You cannot send a request to yourself", "red");

            socket.emit("checkUserExists", target, exists => {
                if (!exists) return showNotification("❌ Player not found", "red");
                socket.emit("friendRequest", {
                    from: currentUser,
                    to: target,
                    photo: userProfile.photo
                });
                showNotification("📩 Friend request sent!", "green");
            });
        });
    }

    createMenuProfile(); // Chama a função para criar os elementos
    // =================================================================
    // --- FIM DO CÓDIGO DO PERFIL ---
    // =================================================================


    // --- Login / Registro ---
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const registerBtn = document.getElementById("registerBtn");
    const loginSubmitBtn = document.getElementById("loginSubmitBtn");
    const guestLoginBtn = document.getElementById("guestLoginBtn");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    if (loginBtn && loginModal) {
        loginBtn.addEventListener("click", () => {
            loginModal.classList.remove("hidden");
        });
    }

    if (closeModalBtn && loginModal) {
        closeModalBtn.addEventListener("click", () => {
            loginModal.classList.add("hidden");
        });
    }

    if (registerBtn && usernameInput && passwordInput) {
        registerBtn.addEventListener("click", () => {
            const user = usernameInput.value.trim();
            const pass = passwordInput.value.trim();
            if (!user || !pass) return showNotification("⚠️ Please fill in all fields!", "red");
            if (user.length < 3 || user.length > 24) return showNotification("Name must be between 3 and 24 characters.", "red");
            if (pass.length < 8 || pass.length > 128) return showNotification("Password must be between 8 and 128 characters.", "red");
            socket.emit("register", {
                username: user,
                password: pass
            });
        });
    }

    if (loginSubmitBtn && usernameInput && passwordInput) {
        loginSubmitBtn.addEventListener("click", () => {
            const user = usernameInput.value.trim();
            const pass = passwordInput.value.trim();
            if (!user || !pass) return showNotification("⚠️ Please fill in all fields!", "red");
            socket.emit("login", {
                username: user,
                password: pass
            });
        });
    }

    if (guestLoginBtn) {
        guestLoginBtn.addEventListener("click", () => {
            socket.emit("guestLogin", {});
        });
    }

    if (guestPlayBtn) {
        guestPlayBtn.addEventListener("click", () => {
            socket.emit("guestLogin", {});
        });
    }

    const restoredSessionToken = localStorage.getItem(SESSION_TOKEN_KEY);
    if (restoredSessionToken) {
        socket.emit("resumeSession", {
            sessionToken: restoredSessionToken
        });
    }

    socket.on("registerSuccess", data => {
        if (data && typeof data.sessionToken === 'string') {
            storeSessionToken(data.sessionToken);
        }
        showNotification("Account created successfully. You can now log in.", "green");
    });

    socket.on("registerError", msg => showNotification("❌ " + msg, "red"));

    // =================================================================
    // --- LÓGICA DE LOGIN MODIFICADA ---
    // =================================================================
    socket.on("loginSuccess", data => {
        currentUser = data.username;
        userProfile = data;
        if (data && typeof data.sessionToken === 'string') {
            storeSessionToken(data.sessionToken);
        }
        loginModal.classList.add("hidden");
        showNotification("Login successful! Welcome, " + data.username + "!", "green");

        // Update the menu UI to show the player is logged in
        loginSection.classList.add('hidden');
        playSection.classList.remove('hidden');
        playerNameDisplay.textContent = currentUser;

        // Show the profile icon in the menu
        if (menuProfileIcon) menuProfileIcon.style.display = 'block';
    });

    socket.on("resumeSessionError", () => {
        clearSessionToken();
    });

    socket.on("guestLoginSuccess", data => {
        currentUser = data.username;
        userProfile = {
            ...data,
            isGuest: true,
            friends: [],
            requests: []
        };
        clearSessionToken();
        loginModal.classList.add("hidden");
        showNotification("Guest connected as " + data.username + "!", "green");

        loginSection.classList.add('hidden');
        playSection.classList.remove('hidden');
        playerNameDisplay.textContent = currentUser;

        if (menuProfileIcon) menuProfileIcon.style.display = 'none';
    });

    socket.on("commandListState", ({ enabled, commands }) => {
        applyCommandList(enabled, commands);
    });
    // =================================================================
    // --- FIM DA LÓGICA DE LOGIN MODIFICADA ---
    // =================================================================

    // =================================================================
    // --- NOVA LÓGICA PARA INICIAR O JOGO ---
    // =================================================================
    playGameBtn.addEventListener('click', () => {
        if (!currentUser) {
            showNotification("⚠️ You need to log in or play as a guest to start.", "red");
            return;
        }

        // Esconde TODA a interface do menu
        const menuUI = document.getElementById('menu-ui');
        if (menuUI) menuUI.style.display = 'none';

        // Hide the menu profile icon
        if (menuProfileIcon) menuProfileIcon.style.display = 'none';

        // Clear the canvas to remove any menu leftovers
        const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // REMOVIDO: A criação do perfil do jogo foi removida para atender ao pedido 3.
        // createProfileUI(); 
        updateFriendsUI();
        renderChatFriends();

        // Chama a função para iniciar o seu jogo!
        if (typeof startGame === 'function') {
            startGame(currentUser);
        }
    });
    // =================================================================
    // --- FIM DA NOVA LÓGICA ---
    // =================================================================

    socket.on("loginError", msg => showNotification("❌ " + msg, "red"));
    // --- Perfil do JOGO ---
    const profileContainer = document.getElementById("profileBallContainer");

    function createProfileUI() {
        profileContainer.innerHTML = "";
        const ball = document.createElement("div");
        ball.className = "profile-ball";
        if (userProfile.photo) {
            const img = document.createElement("img");
            img.src = userProfile.photo;
            ball.appendChild(img);
        } else {
            ball.textContent = userProfile.username[0].toUpperCase();
            ball.style.backgroundColor = userProfile.color;
        }
        profileContainer.appendChild(ball);

        ball.onclick = () => {
            showProfileMenu();
        };
    }

    function showProfileMenu() {
        // Evita criar múltiplos menus
        const existingMenu = document.querySelector('.profile-context-menu');
        if (existingMenu) existingMenu.remove();

        const menu = document.createElement("div");
        menu.className = "generic-modal profile-context-menu"; // Adiciona classe para fácil remoção
        menu.style.backgroundColor = "transparent";
        menu.style.alignItems = "flex-start";
        menu.style.justifyContent = "flex-start";
        menu.innerHTML = `
        <div style="position: fixed; top: 75px; right: 20px; background-color: #111; border-radius: 5px; display: flex; flex-direction: column; gap: 5px; padding: 10px; z-index: 3000; border: 1px solid #444;">
            <button id="profileMenuFriendsBtn">Friends</button>
            <button id="profileMenuSettingsBtn">Settings</button>
        </div>
    `;

        document.body.appendChild(menu);

        document.getElementById('profileMenuFriendsBtn').onclick = () => {
            document.getElementById('friendsModal').classList.remove('hidden');
            menu.remove();
        };
        document.getElementById('profileMenuSettingsBtn').onclick = () => {
            document.getElementById('settingsModal').classList.remove('hidden');
            menu.remove();
        };

        // Remove menu se clicar fora
        menu.addEventListener("click", e => {
            if (e.target === menu) menu.remove();
        });
    }
    // --- Notificações ---
    function showNotification(text, color = "yellow") {
        if (typeof window.translateLegacy === 'function') text = window.translateLegacy(text);
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.left = "50%";
        container.style.transform = "translateX(-50%)";
        container.style.padding = "10px 20px";
        container.style.borderRadius = "5px";
        container.style.zIndex = "9999";
        container.style.backgroundColor = color;
        container.style.maxWidth = "calc(100vw - 40px)";
        container.style.whiteSpace = "normal";
        container.style.textAlign = "center";
        container.style.wordBreak = "break-word";
        container.style.boxSizing = "border-box";
        container.textContent = text;
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 4000);
    }

    socket.on("friendRequestNotification", ({
        from,
        color,
        photo
    }) => {
        if (!userProfile) return;
        if (!userProfile.requests.includes(from)) userProfile.requests.push(from);
        updateFriendsUI();
        showNotification("Friend request from " + from, "blue");
    });

    socket.on("friendAccepted", ({
        from
    }) => {
        if (!userProfile) return;
        if (!userProfile.friends.includes(from)) userProfile.friends.push(from);
        updateFriendsUI();
        renderChatFriends();
        showNotification("You and " + from + " are now friends!", "green");
    });

    function updateFriendsUI() {
        if (!userProfile) return;
        friendsList.innerHTML = "";
        requestsList.innerHTML = "";

        userProfile.friends.forEach(f => {
            const li = document.createElement("li");
            li.textContent = f;
            li.onclick = () => openChat(f);
            friendsList.appendChild(li);
        });

        userProfile.requests.forEach(r => {
            const li = document.createElement("li");
            const nameSpan = document.createElement("span");
            nameSpan.textContent = r;

            const buttonsDiv = document.createElement("div");

            const accept = document.createElement("button");
            accept.textContent = "Aceitar";
            accept.onclick = () => {
                socket.emit("acceptRequest", {
                    from: r,
                    to: currentUser
                });
                if (!userProfile.friends.includes(r)) userProfile.friends.push(r);
                userProfile.requests = userProfile.requests.filter(req => req !== r);
                updateFriendsUI();
            };
            const reject = document.createElement("button");
            reject.textContent = "Recusar";
            reject.onclick = () => {
                socket.emit("rejectRequest", {
                    from: r,
                    to: currentUser
                });
                userProfile.requests = userProfile.requests.filter(req => req !== r);
                updateFriendsUI();
            };

            buttonsDiv.appendChild(accept);
            buttonsDiv.appendChild(reject);
            li.appendChild(nameSpan);
            li.appendChild(buttonsDiv);
            requestsList.appendChild(li);
        });
    }

    // --- Friends & Chat UI refs ---
    const friendsList = document.getElementById("friendsList");
    const requestsList = document.getElementById("requestsList");
    const chatFriendsContainer = document.getElementById("chatFriends");
    const chatMessagesFloating = document.getElementById("chatMessagesFloating");
    const chatInputFloating = document.getElementById("chatInputFloating");
    const sendChatFloating = document.getElementById("sendChatFloating");
    let currentChat = null;
    let chatHistory = {};

    function renderChatFriends() {
        chatFriendsContainer.innerHTML = "";
        userProfile.friends.forEach(f => {
            const btn = document.createElement("div");
            btn.className = "chat-friend-btn";
            btn.textContent = f;
            btn.onclick = () => openChat(f);
            chatFriendsContainer.appendChild(btn);
        });
    }

    function openChat(friend) {
        currentChat = friend;
        chatMessagesFloating.innerHTML = "";
        if (!chatHistory[friend]) chatHistory[friend] = [];
        chatHistory[friend].forEach(msg => appendMessage(msg.sender, msg.msg));
        chatMessagesFloating.scrollTop = chatMessagesFloating.scrollHeight;
        document.getElementById("chatFloating").classList.remove("hidden");
        document.getElementById("chatHeader").textContent = `Chat com ${friend}`;
    }

    sendChatFloating.addEventListener("click", sendMessage);
    chatInputFloating.addEventListener("keydown", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        const msg = chatInputFloating.value.trim();
        if (!msg || !currentChat) return;
        socket.emit("dm", {
            to: currentChat,
            msg
        });
        appendMessage(currentUser, msg);
        chatInputFloating.value = "";
        if (!chatHistory[currentChat]) chatHistory[currentChat] = [];
        chatHistory[currentChat].push({
            sender: currentUser,
            msg
        });
    }

    socket.on("dm", ({
        from,
        msg
    }) => {
        if (!chatHistory[from]) chatHistory[from] = [];
        chatHistory[from].push({
            sender: from,
            msg
        });
        if (from === currentChat) appendMessage(from, msg);
        showNotification("New message from " + from, "blue");
    });

    function appendMessage(sender, msg) {
        const div = document.createElement("div");
        div.innerHTML = `<b>${sender}:</b> ${msg}`;
        chatMessagesFloating.appendChild(div);
        chatMessagesFloating.scrollTop = chatMessagesFloating.scrollHeight;
    }
});
