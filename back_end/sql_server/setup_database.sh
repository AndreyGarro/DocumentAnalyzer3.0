#!/usr/bin/env bash
# Wait for database to startup

HEALTHCHECK CMD curl --fail http://localhost:1433 || exit 1
#sleep 10

sudo ./opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P ProyectSOA123 -i TableCreator.sql
sudo ./opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P ProyectSOA123 -i DataLoader.sql
sudo ./opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P ProyectSOA123 -i StoredProcedures.sql