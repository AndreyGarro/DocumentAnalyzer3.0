--------------------------------------------------------------------
-- Proyecto #1 - Document Analyzer
--------------------------------------------------------------------
-- Instituto Técnológico de Costa Rica
-- Área Académica de Ingeniería en Computadores
-- Bases de Datos (CE3101)
-- I Semestre 2020
-- Prof. Jose Isaac Ramirez Herrera
-- Estudiantes:
--		Gabriela Ávila Quesada - 2013103650
--		Edgar Chaves González -  2017239281
--		Fiorella Delgado León - 2017121626
--		Karla Rivera Sánchez - 2016100425
--		Andrey Sibaja Garro - 2017101898

--------------------------------------------------------------------
-- Document Analyzer - Data Loader
--------------------------------------------------------------------


-- Reiniciar contador de las PK
 DBCC CHECKIDENT (Person, RESEED, 0);

-- Conectar Java
--https://docs.microsoft.com/en-us/sql/connect/jdbc/step-3-proof-of-concept-connecting-to-sql-using-java?view=sql-server-ver15 

-- Data of Persons 
 INSERT INTO Person VALUES
     ('Fiorella', 'Delgado', '117260703'),
	 ('Ana', 'Leon', '104360872'),
	 ('Juan', 'Sanchez', '309881679'),
	 ('Nathalya', 'Garro', '657830928'),
	 ('Gabriela', 'Avila', '112356473'),
	 ('Andrey', 'Sibaja', '192924766'),
	 ('Edgar', 'Chaves', '489780901'),
	 ('Fabian', 'Quesada', '546412322'),
	 ('Rebeca', 'Arroyo', '989895687'),
	 ('Gerald', 'Valverde', '275460989'),
	 ('Karla', 'Rivera', '518351783');



-- Data of Employees
 DBCC CHECKIDENT (Employee, RESEED, 0);

INSERT INTO Employee VALUES
    ('Contabilidad', 'Con-001', 2),
	('TI', 'TI-001', 1),
	('Administrador', 'Adm-001', 3),
	('Contabilidad', 'Con-002', 4),
	('TI', 'TI-002', 5),
	('Asesor financiero', 'AF-001', 6),
	('Gerencia', 'Ger-001', 7),
	('Recursos humanos', 'RH-001', 8),
	('Asesoria legal', 'AL-001', 9),
	('TI', 'TI-003', 10),
	('TI', 'TI-004', 11);



-- Data of Accounts
 DBCC CHECKIDENT (Account, RESEED, 0);

INSERT INTO Account VALUES
    ('Con-AL', ENCRYPTBYPASSPHRASE ('***','12345'), 2),
	('TI-FD', ENCRYPTBYPASSPHRASE ('***','12345'), 1),
	('Adm-JS', ENCRYPTBYPASSPHRASE ('***','12345'), 3),
	('Con-NG', ENCRYPTBYPASSPHRASE ('***','12345'), 4),
	('TI-GA', ENCRYPTBYPASSPHRASE ('***','12345'), 5),
	('AF-AD', ENCRYPTBYPASSPHRASE ('***','12345'), 6),
	('Ger-EC', ENCRYPTBYPASSPHRASE ('***','12345'), 7),
	('RH-FQ', ENCRYPTBYPASSPHRASE ('***','12345'), 8),
	('AL-RA', ENCRYPTBYPASSPHRASE ('***','12345'), 9),
	('TI-GV', ENCRYPTBYPASSPHRASE ('***','12345'), 10),
	('TI-KR', ENCRYPTBYPASSPHRASE ('***','12345'), 11);


