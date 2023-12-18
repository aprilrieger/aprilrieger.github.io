---
title: "Effortlessly Dockerize Your PHP Laravel App: A Step-by-Step Guide."
description: "Designed for both beginners and experienced developers, this step-by-step tutorial demystifies the process of containerizing your Laravel project."
date: "2023-12-17"
banner:
  src: "../../images/kelly-sikkema-Hl3LUdyKRic-unsplash.jpg"
  alt: "Effortlessly Dockerize Your PHP Laravel App: A Step-by-Step Guide"
  caption: 'Photo by <u><a href="https://unsplash.com/photos/Nc5Q_CEcY44">Florian Olivo</a></u>'
categories:
  - "Docker"
  - "PHP"
  - "Laravel"
  - "Tutorial"
keywords:
  - "Docker"
  - "PHP"
  - "Laravel"
  - "Tutorial"
  - "Blog"
---

Dockerizing a PHP Laravel application can streamline your development process, ensuring consistency across environments and simplifying deployment. This guide is a practical walk-through of Dockerizing a fresh PHP Laravel application, ideal for beginners and seasoned developers alike.

**Tested on:**
- Mac M2
- macOS: Ventura 13.5.2
- Docker: 4.22.1

**Requisite:**
- Docker

## Introduction

Docker offers a world of convenience for developers. By containerizing your PHP Laravel application, you're setting up a development environment that's easy to share and deploy, free from the "it works on my machine" syndrome. In this guide, we'll start from scratch, setting up a Laravel application and then Dockerizing it for consistent development and deployment.

## Preparing Your Environment

Before diving into Docker, let's set up our local environment. This will be useful to understand the dependencies that we will later encapsulate within our Docker container.

If you prefer not to install these dependencies locally, feel free to clone the repository [here](https://github.com/aprilrieger/larvel-app) and follow along.

### Install Dependencies on a Mac

```bash
brew install docker
brew install composer
brew install php@8.2
composer global require laravel/installer
```

## Create Your New PHP Laravel Project
```bash
composer create-project --prefer-dist laravel/laravel laravel-app
```

## Start the Apache Server & Navigate to your project directory and start the server:
```bash
cd laravel-app
php artisan serve
```

Now, you can visit [http://localhost:8000/](http://localhost:8000/) in your browser.

For Windows or Linux users, check out this helpful documentation on installing Laravel: [Kinsta's Laravel Installation Guide](https://kinsta.com/knowledgebase/install-laravel/#how-to-install-laravel-on-macos).

## Dockerizing the Laravel Application
With our local setup complete, we now have a clear understanding of what our Docker container needs. Let's proceed to Dockerize the application.

## Crafting the Dockerfile
Our Dockerfile will define the environment our Laravel app needs to run. We'll use PHP with Apache as our base image and install necessary system dependencies and PHP extensions.

```bash
# Use PHP with Apache as the base image
FROM php:8.2-apache as web

# Install Additional System Dependencies
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite for URL rewriting
RUN a2enmod rewrite

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql zip

# Configure Apache DocumentRoot to point to Laravel's public directory
# and update Apache configuration files
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Copy the application code
COPY . /var/www/html

# Set the working directory
WORKDIR /var/www/html

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install project dependencies
RUN composer install

# Set permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
```

## Setting Up docker-compose with MySQL
Now, let's define our docker-compose.yml file. This file will set up our Laravel application and a MySQL database as microservices.

```bash
version: '3.8'

services:
  web:
    image: app-name:latest
    build:
      target: web
      context: .
    env_file:
      - .env
    ports:
      - "8000:80"
    volumes:
      - .:/var/www/html
    depends_on:
      - db
  
  db:
    platform: "linux/amd64"
    image: mysql:5.7
    env_file:
      - .env
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_USER: ${DB_USERNAME}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - "3306:3306"
    volumes:
      - dbdata:/var/lib/mysql

volumes:
  dbdata:
```

## Building and Running the Docker Containers
With our Dockerfile and docker-compose ready, it's time to build and run our containers.

```bash
docker compose build
docker compose up -d
```

Navigate to [http://localhost:8000/](http://localhost:8000/) in your browser to see your Dockerized Laravel app in action.

For a visual guide on Dockerization, check out this helpful video: [Dockerization Tutorial](https://www.youtube.com/watch?v=uYhowDSkwyk).

## Conclusion
Dockerizing a PHP Laravel application is a straightforward process that offers significant benefits for development and deployment. Remember, the key to mastering Docker is consistent practice and exploration. Don’t hesitate to experiment with different configurations and setups.

Happy Dockerizing!