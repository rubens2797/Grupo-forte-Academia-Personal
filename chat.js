document.addEventListener('DOMContentLoaded', function () {
    const loginBtn = document.getElementById('loginBtn');
    const sendMessageBtn = document.getElementById('sendMessageBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const messageInput = document.getElementById('messageInput');
    const chatBox = document.getElementById('chatBox');
    const userNameInput = document.getElementById('userName');
    const userTypeSelect = document.getElementById('userType');
    const userInfo = document.getElementById('userInfo');
    const loginContainer = document.getElementById('loginContainer');
    const chatContainer = document.getElementById('chatContainer');

    // Função para fazer login
    loginBtn.addEventListener('click', () => {
        const userName = userNameInput.value.trim();
        const userType = userTypeSelect.value;
        if (userName) {
            loginContainer.style.display = 'none';
            chatContainer.style.display = 'flex';
            userInfo.textContent = `${userName} - ${userType}`;

            // Armazena usuário no LocalStorage
            localStorage.setItem('userName', userName);
            localStorage.setItem('userType', userType);

            // Inicia o listener do chat
            listenForMessages();
        } else {
            alert('Por favor, insira seu nome.');
        }
    });

    // Função para fazer logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('userName');
        localStorage.removeItem('userType');
        window.location.reload();
    });

    // Função para enviar mensagem
    sendMessageBtn.addEventListener('click', () => {
        const userName = localStorage.getItem('userName');
        const userType = localStorage.getItem('userType');
        const message = messageInput.value.trim();

        if (message) {
            const newMessage = {
                user: userName,
                type: userType,
                message: message,
                timestamp: new Date().toISOString()
            };

            // Envia para o Firebase
            firebase.database().ref('messages').push(newMessage);
            messageInput.value = ''; // Limpa o input
        } else {
            alert('Por favor, digite uma mensagem.');
        }
    });

    // Função para ouvir mensagens no Firebase
    const listenForMessages = () => {
        const messagesRef = firebase.database().ref('messages');
        messagesRef.on('child_added', function(snapshot) {
            const msg = snapshot.val();
            displayMessage(msg);
        });
    };

    // Função para exibir mensagens
    const displayMessage = (msg) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.type.toLowerCase());
        messageDiv.innerHTML = `<strong>${msg.user}</strong>: ${msg.message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    // Carregar usuário ao entrar
    if (localStorage.getItem('userName')) {
        loginContainer.style.display = 'none';
        chatContainer.style.display = 'flex';
        userInfo.textContent = `${localStorage.getItem('userName')} - ${localStorage.getItem('userType')}`;
        listenForMessages();
    }
});
