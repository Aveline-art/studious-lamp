---
layout: default
title: About
permalink: /about
---
# About page

studious-lamp is a proof-of-concept for a form that supports the [Hackforla.org Website](https://www.hackforla.org/projects/website) project. At Hack For LA, we use the static website generator, Jekyll to render the website. In lieu of a traditional database, Jekyll places data inside a _data directory using .yml files struture the data. Therefore, when a new project needs to be showcased on the [projects page](https://www.hackforla.org/projects/), the data concerning the project needs to be formatted in a .yml file.

As the website currently stands, there is no mechanism for a project to update the .yml file directly. The stakeholder for keeping a project updated, project managers, usually do not have the expertise nor permissions needed to edit the .yml files. Currently, the process to updating a project's data involves: 1) checking off current data, 2) give corrections for outdated data, 3) open an issue with information from step 1 and 2, 4) have a developer of the website project take up the issue. This process is painfully slow, and full of errors as information is often unclear, or lost when translated from project managers to developers.

The goal of this proof-of-concept is to streamline the process by:

1. providing a form, with validation, that limits errors
2. a visual representation of the project as it will appear on the website
3. a translator that directly translate inputs from the form into the project's .yml file

This website is built on Jekyll, with the help of Bootstrap for styling. This choice of technology reflects the technology used on the website project. Indeed, I believe that, should this proof-of-concept is accepted, it will live as a part of the website project's development website. It will provide an easily accessible space for project managers to update their project's data. At the same time, the website project will be the maintainer of this code, should its format ever needs to be changed.

### Artorsaki

Why is the form called Artorsaki? There is no special reason. The meaning behind the name is a portmanteau of two characters from the nonsensically-named anime, [Fate/Stay Night: Unlimited Blade Works](https://en.wikipedia.org/wiki/Fate/stay_night:_Unlimited_Blade_Works_(TV_series)). Specifically, the characters are *Artoria Pendragon*, a female version of King Arthur, and *Sasaki Kojirou*, a legendary Japanese swordsman. These two characters had a grand total two scenes together in the entire 25 episode series. Nevertheless, the creator of this website was completely enamoured with their openly flirtations with one another. Like all anime fangirls, the appropriate way to speak of two characters as a couple is to combine their names. Hence, Artorsaki is born.