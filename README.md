# 💰 Digital Banking - Application de Gestion Bancaire avec IA

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen)
![Angular](https://img.shields.io/badge/Angular-16+-red)
![JWT](https://img.shields.io/badge/JWT-Security-blue)
![OpenAI](https://img.shields.io/badge/OpenAI-Chatbot-purple)

## 📋 Description

**Digital Banking** est une application complète de gestion bancaire qui combine :
- Une gestion classique des comptes bancaires (courants et épargnes)
- Un système d'authentification sécurisé avec JWT
- Un chatbot intelligent basé sur RAG (Retrieval Augmented Generation)
- Une interface utilisateur moderne avec Angular

## 👨‍💻 Auteur

**Mohamed YOUSSFI**

## 🎥 Présentation du Projet

[Vidéo de présentation](https://www.youtube.com/watch?v=x6gFWmRxNPE)

---

## 📚 Table des Matières

- [Fonctionnalités](#-fonctionnalités)
- [Stack Technique](#-stack-technique)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Endpoints](#-api-endpoints)
- [Interface Utilisateur](#-interface-utilisateur)
- [Chatbot IA](#-chatbot-ia)
- [Sécurité](#-sécurité)
- [Captures d'écran](#-captures-décran)
- [Contributions](#-contributions)

---

## ✨ Fonctionnalités

### Backend (Spring Boot)
- ✅ CRUD complet des clients
- ✅ Gestion des comptes bancaires (Courant & Épargne)
- ✅ Opérations bancaires (Débit/Crédit)
- ✅ Transferts entre comptes
- ✅ Historique des transactions
- ✅ Documentation API avec Swagger/OpenAPI

### Frontend (Angular)
- ✅ Dashboard avec graphiques interactifs (ChartJS)
- ✅ Gestion des clients (ajout, modification, suppression, recherche)
- ✅ Gestion des comptes bancaires
- ✅ Visualisation des opérations
- ✅ Interface responsive

### Sécurité
- ✅ Authentification JWT
- ✅ Gestion des rôles (USER, ADMIN)
- ✅ Changement de mot de passe
- ✅ Audit des opérations par utilisateur

### Intelligence Artificielle
- ✅ Chatbot basé sur RAG
- ✅ Intégration Telegram
- ✅ Assistance bancaire 24/7

---

## 🛠 Stack Technique

### Backend
| Technologie | Version | Rôle |
|------------|---------|------|
| Spring Boot | 3.x | Framework principal |
| Spring Security | 3.x | Sécurité |
| Spring Data JPA | 3.x | Accès aux données |
| MySQL | 8.x | Base de données |
| JWT | 0.11.5 | Tokens d'authentification |
| Swagger (OpenAPI) | 2.1.0 | Documentation API |
| OpenAI API | - | Chatbot IA |
| Telegram Bot API | - | Interface chatbot |

### Frontend
| Technologie | Version | Rôle |
|------------|---------|------|
| Angular | 16+ | Framework UI |
| Chart.js | 4.x | Graphiques |
| Bootstrap | 5.x | Styles |
| RxJS | 7.x | Programmation réactive |

---

## 🏗 Architecture
Digital Bankin<br>
├── Backend (Spring Boot)<br>
│ ├── Entities (Customer, BankAccount, Operation)<br>
│ ├── Repositories (JPA)<br>
│ ├── Services (Business Logic)<br>
│ ├── Controllers (REST API)<br>
│ ├── Security (JWT)<br>
│ └── Chatbot (RAG + Telegram)<br>
│<br>
├── Frontend (Angular<br>
│ ├── Components (Dashboard, Customers, Accounts)<br>
│ ├── Services (HTTP, Auth)<br>
│ ├── Guards (Route protection)<br>
│ └── Models (Data structures)<br>
│<br>
└── Database (MySQL)<br>
├── customers<br>
├── bank_accounts<br>
├── operations<br>
└── users<br>

---

## 🚀 Installation

### Prérequis
- Java 17+
- Node.js 18+
- MySQL 8+
- Angular CLI

### Backend

```bash
# Cloner le projet
git clone https://github.com/yourusername/digital-bankin.git
cd digital-bankin/backend

# Configurer la base de données
# Créer une base de données MySQL nommée "digital_bankin_db"

# Configurer application.properties
cp src/main/resources/application.properties.example src/main/resources/application.properties
# Éditer avec vos identifiants MySQL

# Installer les dépendances Maven
mvn clean install

# Lancer l'application
mvn spring-boot:run

---

### Frontend
---
cd digital-bankin/frontend

# Installer les dépendances
npm install

# Lancer l'application
ng serve

# Accéder à l'application
# Ouvrir http://localhost:4200
