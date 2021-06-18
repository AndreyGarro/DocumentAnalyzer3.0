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
-- Document Analyzer - Stored Procedure
--------------------------------------------------------------------

-- Stored Procedure para obtener el Id de la cuenta, 
-- al ingresar el userName
/*
CREATE PROCEDURE getidAccount(
	-- Atributs of Account
      @userName VARCHAR(40))
AS
begin
	SELECT a.accountId
    FROM Account AS a
    WHERE a.userName = @userName 

end; */


--  EXEC getidAccount @userName = 'TI-KR'; 


-- Stored Procedure para obtener el nombre y apellido de la persona, 
-- al ingresar el userName
/*
CREATE PROCEDURE getName(
	-- Atributs of Account
      @idAccount INTEGER)
AS
begin
	SELECT p.firstName, p.lastName

	FROM Person AS p, Employee AS e, Account AS a

	WHERE @idAccount = a.employeeId

		AND a.employeeId = e.employeeId

		AND e.employeeId = p.personId

	RETURN
end;
*/



 -- EXEC getName @idAccount = 2;



-- Stored Procedure para verificar si el userName y securityKey
-- son correctas y corresponden a un empleado en la base de datos
/*
CREATE PROCEDURE securityLogin(
	-- Atributos de Account
      @userName VARCHAR(40), @securityKey VARCHAR(40))
AS
DECLARE @ResultValue bit 
begin
	IF EXISTS  
    (  
        SELECT accountId, userName, securityKey, employeeId
		FROM Account 
		WHERE ((userName = @userName)  AND (DECRYPTBYPASSPHRASE ( '***', securityKey) = @securityKey))  
        )  
		
	 BEGIN  
		 SET  @ResultValue = 1 
	 END  
	
	 ELSE
		 BEGIN  
			SET  @ResultValue = 0 
		 END
	
   RETURN @ResultValue  

end;
*/
-- EXEC securityLogin @userName = 'TI-FD', @securityKey = '12345';

 DECLARE  @return_status bit  
 EXEC @return_status= securityLogin @userName = 'TI-FD', @securityKey = '12345'  
 SELECT @return_status AS securityLogin;

