FROM ubuntu:18.04

# Install all apt packages
RUN apt-get update && apt-get install -y \
	supervisor \
	nginx \
	php7.2-fpm \
	curl \
	make \
	unzip \
	php-mysql \
	php-mbstring \
	php-xml \
	php-zip \
	php-curl \
	gnupg

# Route nginx logs to Docker
RUN ln -sf /dev/stdout /var/log/nginx/access.log && \
	ln -sf /dev/stdout /var/log/nginx/error.log
# Setup PHP fpm
RUN  mkdir /run/php && touch /run/php/php7.2-fpm.sock
# Setup composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer global require hirak/prestissimo
# Setup node.js and NPM
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN apt-get install nodejs -y
RUN npm install -g yarn

COPY ./docker/nginx.conf /etc/nginx/sites-enabled/default
COPY ./docker/www.conf /etc/php/7.2/fpm/pool.d/www.conf
COPY ./docker/supervisor.conf /etc/supervisor/conf.d/supervisord.conf

WORKDIR /code
COPY . /code

EXPOSE 80
EXPOSE 9000

CMD ["/usr/bin/supervisord"]
