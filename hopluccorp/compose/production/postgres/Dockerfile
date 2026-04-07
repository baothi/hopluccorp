FROM postgres:16

COPY ./compose/production/postgres/maintenance /usr/local/bin/maintenance
RUN chmod +x /usr/local/bin/maintenance/*

COPY ./compose/production/postgres/maintenance/_sourced /usr/local/bin/maintenance/_sourced
RUN chmod +x /usr/local/bin/maintenance/_sourced/*
