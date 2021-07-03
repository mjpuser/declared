FROM postgres:13

RUN apt update && apt install git build-essential postgresql-server-dev-13 -y
RUN git clone https://github.com/omniti-labs/pg_amqp.git
RUN cd pg_amqp && make && make install
COPY config-append.conf /config-append.conf
RUN cat /usr/share/postgresql/postgresql.conf.sample > /etc/postgresql/postgresql.conf \
    && cat /config-append.conf >> /etc/postgresql/postgresql.conf
