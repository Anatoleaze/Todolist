# 📝 TodoList VueJS– Application de gestion de tâches

**VueJS TodoList** est un projet web interactif développé avec le framework **Vue.js**.  
Ce projet m’a permis de découvrir le fonctionnement de Vue et d’apprendre à construire une application modulaire et réactive pour la gestion des tâches à accomplir.

---
![Aperçu du jeu](image/todolist.jpg)

---

## 🚀 Fonctionnalités

- ✅ Ajouter une tâche
- 🛠️ Modifier une tâche
- ❌ Supprimer une tâche
- 🔁 Interface utilisateur dynamique et réactive
- 🔧 Architecture modulaire basée sur les composants Vue

---

## 🧱 Technologies utilisées

- **Framework** : [Vue.js](https://vuejs.org/)  
- **Gestion des dépendances** : NPM  
- **Bundler & outils de build** : Webpack  
- **Langages** : HTML5, CSS3, JavaScript (ES6+)

---

## 📦 Installation & Lancement

### 1️⃣ Cloner le projet

```bash
git clone https://github.com/ton-utilisateur/Todolist.git
cd Todolist
```
### 2️⃣ Construire l’image Docker

```bash
docker build -t todolist-app .
```
### 3️⃣ Lancer le conteneur

```bash
docker run -p 8080:80 todolist-app
```
📍 L'application sera accessible à l’adresse suivante :
👉 http://localhost:8080