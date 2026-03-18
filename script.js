document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const customGoogleBtn = document.getElementById('customGoogleBtn');
    
    // Animação de entrada fluida dos inputs
    const inputs = document.querySelectorAll('.input-group input');
    inputs.forEach((input, index) => {
        input.style.opacity = '0';
        input.style.transform = 'translateY(10px)';
        input.style.transition = 'all 0.4s ease forwards';
        
        setTimeout(() => {
            input.style.opacity = '1';
            input.style.transform = 'translateY(0)';
        }, 100 * (index + 1) + 300); // Aguarda terminar a animação do card central
    });

    // Submissão do Formulário Padrão
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = loginForm.querySelector('.btn-primary');
        
        if(email && password) {
            // Efeito visual de carregamento (Loading)
            const originalText = btn.textContent;
            btn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite;">↻</span> Entrando...';
            btn.style.opacity = '0.8';
            btn.disabled = true;
            
            // Simula uma requisição assíncrona com timer
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                
                // Simula o nome via e-mail
                const nome = email.split('@')[0];
                localStorage.setItem('userName', nome.charAt(0).toUpperCase() + nome.slice(1));
                
                window.location.href = 'cardapio.html';
            }, 1200);
        }
    });

    // Ação do Botão Google Customizado (Simulação de Login)
    customGoogleBtn.addEventListener('click', () => {
        // Efeito visual de carregamento no botão
        const originalHTML = customGoogleBtn.innerHTML;
        customGoogleBtn.innerHTML = '<span style="display:inline-block; animation: spin 1s linear infinite; font-size: 18px;">↻</span> <span>Conectando...</span>';
        customGoogleBtn.style.opacity = '0.8';
        customGoogleBtn.disabled = true;
        
        // Simula o tempo de resposta de login e redireciona
        setTimeout(() => {
            localStorage.setItem('userName', 'Visitante VIP');
            window.location.href = 'cardapio.html';
        }, 1200);
    });
});

// Auxiliar para ler o nome de dentro do JWT do Google
function parseJwt(token) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
}

// Callback nativo chamado pelo Google Identity Services após autorização Google com sucesso
function handleCredentialResponse(response) {
    const userData = parseJwt(response.credential);
    if(userData && userData.name) {
        localStorage.setItem('userName', userData.name); // Salva o nome real do Google!
    } else {
        localStorage.setItem('userName', 'Cliente do Google');
    }
    
    // Redireciona para o cardápio
    window.location.href = 'cardapio.html';
}

// Injetando uma classe CSS por script para a animação de girar (Loading do Botão)
const style = document.createElement('style');
style.innerHTML = `
    @keyframes spin { 
        100% { transform: rotate(360deg); } 
    }
`;
document.head.appendChild(style);
