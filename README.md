# 🚀 Guia de Deploy no GitHub Pages - Cronograma de Estudos SEDES/DF

Este projeto foi totalmente preparado e configurado com caminhos de arquivos relativos (`base: './'`) e scripts de automação para que você possa colocá-lo no ar de forma simples, rápida e gratuita utilizando o **GitHub Pages**.

Aqui está o passo a passo completo para você levar seu cronograma personalizado para a web!

---

## 💻 Passo 1: Preparando o ambiente no seu computador

Se você ainda não tem as ferramentas instaladas em sua máquina local:

1. **Instale o Node.js**: Baixe e instale a versão LTS recomendada do [Node.js](https://nodejs.org/).
2. **Instale o Git**: Baixe e instale o [Git](https://git-scm.com/).
3. **Baixe o projeto**: Extraia os arquivos do projeto (ZIP que você exportou do AI Studio) em uma pasta no seu computador.

---

## 📂 Passo 2: Inicializando o Repositório e subindo para o GitHub

1. Abra o terminal (ou Prompt de Comando/PowerShell) na pasta raiz do seu projeto local.
2. Inicialize o repositório Git localmente:
   ```bash
   git init
   ```
3. Adicione todos os arquivos do projeto:
   ```bash
   git add .
   ```
4. Salve as alterações com um commit inicial:
   ```bash
   git commit -m "feat: configuracao inicial do cronograma de estudos"
   ```
5. Crie um novo repositório **público** no seu perfil do GitHub (ex: `cronograma-sedes`).
6. No terminal do seu computador, vincule o repositório local ao GitHub (substitua `SEU_USUARIO` e `NOME_DO_REPOSITORIO` pelos seus dados correspondentes):
   ```bash
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   ```
7. Envie os arquivos originais para o GitHub:
   ```bash
   git push -u origin main
   ```

---

## ⚡ Passo 3: Colocando o Site no Ar (2 Opções Fáceis)

Você pode escolher **uma** das duas formas abaixo para publicar seu site:

### 🏆 Método Recomendado: Usando o Script Automatizado (`npm run deploy`)

Nós já configuramos a biblioteca `gh-pages` e os scripts necessários no seu `package.json` para automatizar todo o processo!

1. No terminal do seu computador, instale as dependências do projeto:
   ```bash
   npm install
   ```
2. Execute o comando de deploy:
   ```bash
   npm run deploy
   ```
   *Este comando irá compilar automaticamente o projeto em código de produção e criar uma branch chamada `gh-pages` no seu GitHub contendo apenas o site estático final.*

3. **No GitHub**:
   - Vá nas configurações do seu repositório (**Settings**).
   - No menu lateral esquerdo, clique em **Pages**.
   - Em **Build and deployment**, certifique-se de que a fonte (**Source**) está configurada como `Deploy from a branch`.
   - No campo **Branch**, selecione `gh-pages` e a pasta `/ (root)`.
   - Clique em **Save**.

---

### ☁️ Método Alternativo: Deploy automático com GitHub Actions (Sem rodar comandos locais)

Se você preferir que o próprio GitHub compile e publique o site sempre que você fizer um commit na branch `main`:

1. No GitHub, acesse as configurações do seu repositório (**Settings**).
2. Vá em **Pages** no menu lateral esquerdo.
3. No campo **Build and deployment -> Source**, mude de `Deploy from a branch` para **GitHub Actions**.
4. O GitHub irá sugerir templates. Escolha o template de **Static HTML** ou crie um arquivo de fluxo de trabalho personalizado em seu projeto no caminho `.github/workflows/deploy.yml` com as instruções de build do Vite.

*(O Método Recomendado via `npm run deploy` é o mais simples e direto de executar para iniciantes!)*

---

## 🔗 Passo 4: Acessando o seu Cronograma!

Após salvar as configurações em **Settings > Pages**, o GitHub fornecerá um link oficial para o seu site no topo da página. O link terá o seguinte formato:

`https://SEU_USUARIO.github.io/NOME_DO_REPOSITORIO/`

Pronto! Seu site estará publicado de forma 100% gratuita, responsiva e pronta para você utilizar no computador, tablet ou celular para acompanhar seus estudos em tempo real!

---

## 💡 Dica de Ouro: Como salvar seu Progresso

O cronograma utiliza o **LocalStorage** do navegador do dispositivo onde você o acessa. Isso significa que as caixas de seleção que você marcar como **Concluído** e as estatísticas diárias serão salvas no seu aparelho, mesmo se você fechar a página ou reiniciar o navegador!
