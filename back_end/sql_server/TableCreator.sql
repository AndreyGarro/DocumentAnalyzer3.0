--------------------------------------------------------------------
-- Proyecto #1 - Document Analyzer
--------------------------------------------------------------------
-- Instituto T�cnol�gico de Costa Rica
-- �rea Acad�mica de Ingenier�a en Computadores
-- Bases de Datos (CE3101)
-- I Semestre 2020
-- Prof. Jose Isaac Ramirez Herrera
-- Estudiantes:
--		Gabriela �vila Quesada - 2013103650
--		Edgar Chaves Gonz�lez -  2017239281
--		Fiorella Delgado Le�n - 2017121626
--		Karla Rivera S�nchez - 2016100425
--		Andrey Sibaja Garro - 2017101898

--------------------------------------------------------------------
-- Document Analyzer - Table Creator
--------------------------------------------------------------------

-- Table Person
-- Atributs: IdPerson, firstName, lastName and identityCard

CREATE DATABASE proyect2_database
GO

USE proyect2_database

CREATE TABLE Person(
    personId INTEGER IDENTITY(1,1) PRIMARY KEY,
    firstName VARCHAR(40) NOT NULL,
	lastName VARCHAR(40) NOT NULL,
	identityCard VARCHAR(50) NOT NULL

);

-- Table Employee
-- Atributs: employeeId, job, employeeCard and personId
-- Reference from Person

CREATE TABLE Employee(
    employeeId INTEGER IDENTITY(1,1) PRIMARY KEY,
    job VARCHAR(40) NOT NULL,
	employeeCard VARCHAR(40) NOT NULL,
    personId INTEGER NOT NULL REFERENCES Person(personId)
);


-- Table Account
-- Atributs: accountId, userName, securityKey and employeeId
-- Reference from Employee

CREATE TABLE Account(
    accountId INTEGER IDENTITY(1,1) PRIMARY KEY,
    userName VARCHAR(40) NOT NULL,
	securityKey VARCHAR(40) NOT NULL,
    employeeId INTEGER NOT NULL REFERENCES Employee(employeeId)
);
