--PARTE 1
--CREACION DE LA BASE DE DATOS

drop table if exists pronostico;
drop table if exists partidos;
drop table if exists equipos;
drop table if exists usuarios;

-- CREACION TABLA DE DATOS EQUIPOS
create table equipos(
	codigo_internacional int not null,
	nombre varchar(100) not null,
	constraint equipos_pk primary key(codigo_internacional)
);

-- INSERCION DE 16 EQUIPOS
insert into equipos(codigo_internacional, nombre)
values(032, 'Argentina'),
(604, 'Peru'),
(152, 'Chile'),
(124, 'Canada'),
(484, 'Mexico'),
(218, 'Ecuador'),
(862, 'Venezuela'),
(388, 'Jamaica'),
(840, 'Estados Unidos'),
(858, 'Uruguay'),
(591, 'Panama'),
(068, 'Bolivia'),
(076, 'Brasil'),
(170, 'Colombia'),
(600, 'Paraguay'),
(188, 'Costa Rica');


create table partidos(
	codigo_partido varchar(3) not null,
	equipo1 varchar(20) not null,
	equipo2 varchar(20) not null,
	fecha_partido date not null,
	hora_partido time not null,	
    constraint partidos_pk primary key(codigo_partido)
);

-- INSERCION DE 10 PRIMEROS PARTIDOS CON INFORMACION REAL
insert into partidos(codigo_partido, equipo1, equipo2, fecha_partido, hora_partido)
values('P1', 'Argentina', 'Canada', '20/06/2024', '20:00'),
('P2', 'Peru', 'Chile', '21/06/2024', '19:00'),
('P3', 'Mexico', 'Jamaica', '22/06/2024', '20:00'),
('P4', 'Ecuador', 'Venezuela', '22/06/2024', '15:00'),
('P5', 'Uruguay', 'Panama', '23/06/2024', '21:00'),
('P6', 'Estados Unidos', 'Bolivia', '23/06/2024', '17:00'),
('P7', 'Colombia', 'Paraguay', '24/06/2024', '17:00'),
('P8', 'Brasil', 'Costa Rica', '24/06/2024', '18:00'),
('P9', 'Chile', 'Argentina', '25/06/2024', '21:00'),
('P10', 'Peru', 'Canada', '25/06/2024', '17:00');

-- CREACION TABLA USUARIOS
create table usuarios(
	codigo_usuario varchar(3) not null,
	cedula int not null,
	nombre varchar(100) not null,
	apellido varchar(100) not null,
	constraint usuarios_pk primary key(codigo_usuario)
);

-- INSERCION DE 3 USUARIOS
insert into usuarios(codigo_usuario, cedula, nombre, apellido)
values('U1', 1715893101, 'Joselyne', 'Morales'),
('U2', 1025458796, 'Andrea', 'Gonzaga'),
('U3', 1542035879, 'Juan', 'Perez');


-- CREACION DE TABLA PRONOSTICO
create table pronostico(
	codigo_pronostico serial not null,
	codigo_u varchar(3) not null,
	codigo_p varchar(3) not null,
	codigo_equipo1 int not null,
	marcador_equipo1 int not null,
	codigo_equipo2 int not null,
	marcador_equipo2 int not null,
	constraint pronostico_pk primary key(codigo_pronostico),
	constraint usuarios_fk foreign key(codigo_u) references usuarios(codigo_usuario),
	constraint partidos_fk foreign key(codigo_p) references partidos(codigo_partido),
	constraint codigo_e1_fk foreign key(codigo_equipo1) references equipos(codigo_internacional),
	constraint codigo_e2_fk foreign key(codigo_equipo2) references equipos(codigo_internacional)
);

-- INSERCION DE PRONOSTICOS
insert into pronostico(codigo_u, codigo_p, codigo_equipo1, marcador_equipo1, codigo_equipo2, marcador_equipo2)
values('U1', 'P4', 218, 2, 862, 0),
('U1', 'P1', 032, 1, 124, 0),
('U1', 'P2', 604, 2, 152, 2),
('U2', 'P4', 218, 1, 862, 0),
('U2', 'P3', 484, 1, 388, 1),
('U2', 'P5', 858, 1, 591, 2),
('U3', 'P4', 218, 2, 862, 1),
('U3', 'P6', 840, 0, 068, 3),
('U3', 'P7', 170, 0, 858, 3);

--PARTE 3
--RECUPERAR TODOS LOS PARTIDOS QUE SE JUEGAN EL 22 DE JUNIO 
select * from partidos where fecha_partido='2024-06-22';

--RECUPERAR LOS PRONOSTICOS DE UN USUARIO ESPECIFICO
select * from usuarios where cedula=17158931

select * from equipos;
select * from partidos;
select * from usuarios;
select * from pronostico;
