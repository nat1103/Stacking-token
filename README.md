# README - Contrat de Staking FalzarMoney par Nathan COURS
***
## Table of Contents
1. [General Info](#general-info)
2. [Contract](#description-du-contrat)
3. [Front](#Front-end)
4. [commandes](#commandes)
5. [Ressenti](#Ressenti)

## General Info

Il est important de noter qu'une partie front-end interagit avec ce contrat, qui est déployé sur la blockchain Sepolia :

Ce contrat intelligent (smart contract) a été développé en Solidity et fonctionne sur la blockchain Ethereum. Il permet aux utilisateurs de miser (staker) des jetons FalzarMoney (FMY) pour gagner des récompenses en fonction de la durée pendant laquelle les jetons sont misés. Le front-end facilite l'interaction des utilisateurs avec ce contrat, leur permettant de visualiser et de gérer leurs mises (stakes)"

## Description du Contrat

Le contrat est une extension de base du contrat ERC20 (standard Ethereum pour les jetons) et offre des fonctionnalités de mise (staking) et de récompense.

### Fonctionnalités Principales
Mise de Jetons (Staking)
Les utilisateurs peuvent miser des jetons FalzarMoney en utilisant la fonction stake. Pour ce faire, ils doivent approuver le contrat à dépenser leurs jetons en appelant la fonction approve du contrat ERC20.

### Retrait de Jetons (Unstaking)
Les utilisateurs peuvent retirer leurs jetons misés après une période de 7 jours en appelant la fonction unstake. Ils recevront à la fois leurs jetons misés et des récompenses basées sur la durée de mise.

### Calcul des Récompenses
Les récompenses sont calculées en fonction de la durée pendant laquelle les jetons ont été misés. Plus la durée est longue, plus la récompense est élevée. Le calcul exact est effectué dans la fonction calculateReward.

### Déploiement Initial
Le contrat est déployé avec un approvisionnement initial de jetons FalzarMoney (FMY). Les jetons sont émis au compte du déploiement initial.

## Front-End

Une partie du front-end de cette application utilise la bibliothèque Wagmi. Les fonctionnalités de mise (staker), de retrait (unstaker), de transfert et d'approbation sont mises en œuvre dans l'interface utilisateur.

## Événements
Le contrat émet deux types d'événements pour permettre la surveillance des transactions liées à la mise et au retrait de jetons.

* Staked: Émis lorsqu'un utilisateur mise des jetons.
* Unstaked: Émis lorsqu'un utilisateur retire ses jetons après la période de verrouillage de 7 jours.
### Note Importante
Assurez-vous d'approuver le contrat à dépenser vos jetons avant de les miser.
Les récompenses augmentent avec la durée de la mise, encourageant ainsi les utilisateurs à conserver leurs jetons misés plus longtemps.

Le retrait des jetons n'est autorisé qu'après une période de 7 jours pour encourager la stabilité du contrat.
N'oubliez pas de vérifier la version de Solidity prise en charge lors du déploiement, ici ^0.8.23. Assurez-vous que votre environnement de développement prend en charge cette version.

## Commandes

### Installation

Pour la partie front-end, il faut installer les dépendances avec la commande suivante :
```
npm install
```
Pour la partie contarct, il faut installer les dépendances avec la commande suivante :
```
forge install
```

### Test

La commande suivante va faire tester tous les contrats :

```
forge t 
```

## Ressenti

J'ai vraiment apprécié le processus de développement de contrats blockchain dans le cadre de ce cours passionnant. J'ai acquis de nombreuses connaissances enrichissantes et je compte approfondir davantage mon intérêt personnel pour la blockchain et le déploiement de contrats. Cependant, là où je rencontre plus de difficultés, c'est dans la compréhension approfondie des contrats et dans la mise en œuvre précise de ce qui était requis. Mais je suis très satisfait de ce que j'ai pu réaliser et je compte bien continuer à apprendre et à m'améliorer dans ce domaine.
