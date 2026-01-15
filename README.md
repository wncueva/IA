LEERAN BIEN JASJSJS 


ENDPOINTS
LISTAR TODOS LOS EMPLEADOS
GET http://localhost:3001/api/empleados

Obtener empleado por CI
GET http://localhost:3001/api/empleados/{ci}
GET http://localhost:3001/api/empleados/1003484936


CREAR
POST http://localhost:3001/api/empleados
Content-Type: application/json
******ejemplo******
{
  "ci": "0102030405",
  "id_a": 1,
  "id_t": 1,
  "id_b": 1,
  "id_ba": 1,
  "nombres": "Juan",
  "apellidos": "Perez",
  "direccion": "Av. Siempre Viva",
  "telefonos": "0999999999",
  "correo": "juan@correo.com",
  "fecha_nacimiento": "1999-01-01",
  "fecha_ingreso": "2024-01-01",
  "fecha_contrato": "2024-01-01",
  "salario": 500.50,
  "clave": "1234"
}
***********************

ACTUALIZAR
PUT http://localhost:3001/api/empleados/{ci}
PUT http://localhost:3001/api/empleados/1003484936
********ejemplo***********
{
  "direccion": "Nueva dirección",
  "salario": 650.00,
  "clave": "nuevaClave"
}
*************************

Eliminar

DELETE http://localhost:3001/api/empleados/{ci}
http://localhost:3001/api/empleados/1003484936

