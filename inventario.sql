drop table if exists detalle_pedido;
drop table if exists detalle_ventas;
drop table if exists historial_stock;
drop table if exists cabecera_pedido;
drop table if exists cabecera_ventas;
drop table if exists proveedores;
drop table if exists estados_pedidos;
drop table if exists productos;
drop table if exists unidades_medida;
drop table if exists categorias;
drop table if exists categoria_unidad_medida;
drop table if exists tipo_documentos;

select * from tipo_documentos;

create table categorias(
	codigo_cat serial not null,
    nombre varchar(100) not null,
    categoria_padre int,
    constraint categorias_pk primary key(codigo_cat),
    constraint categorias_fk foreign key (categoria_padre) references categorias(codigo_cat)
);

insert into categorias(nombre, categoria_padre)
values('Materia Prima', null),
('Proteina',1),
('Salsas',1),
('Punto de Venta', null),
('Bebidas', 4),
('Con alcohol',5),
('Sin alcohol',5);

create table categoria_unidad_medida(
    codigo_udm char(1) not null,
    nombre varchar(100) not null,
    constraint categoria_unidad_medida_pk primary key(codigo_udm)
);

insert into categoria_unidad_medida(codigo_udm, nombre)
values('U', 'Unidades'),
('V', 'Volumen'),
('P', 'Peso');

create table unidades_medida(
	nombre char(2) not null,
    descripcion varchar(100) not null,
    categoria_udm char(1) not null,
    constraint udm_pk primary key(nombre),
    constraint udm_fk foreign key (categoria_udm) references categoria_unidad_medida(codigo_udm)
);

insert into unidades_medida(nombre, descripcion, categoria_udm)
values('ml', 'mililitros', 'V'),
('l', 'litros', 'V'),
('u', 'unidad', 'U'),
('d', 'docena', 'U'),
('g', 'gramos', 'P'),
('kg', 'kilogramos', 'P'),
('lb', 'libras', 'P');

create table productos(
	codigo_prod serial not null,
    nombre varchar(100) not null,
    udm char(2) not null,
    precio_venta money not null,
    tiene_IVA boolean not null,
    coste money not null,
    categoria int not null,
    stock int not null,
    constraint productos_pk primary key(codigo_prod),
    constraint productos_udm_fk foreign key (udm) references unidades_medida(nombre),
    constraint productos_cat_fk foreign key (categoria) references categorias(codigo_cat)
);

insert into productos(nombre, udm, precio_venta, tiene_IVA, coste, categoria, stock)
values('Coca cola pequena', 'ml', 0.5804, true, 0.3729, 7, 105),
('Salsa de tomate', 'kg', 0.95, true, 0.8736, 3,0),
('Mostaza', 'kg', 0.95, true, 0.89, 3, 0),
('Fuze Tea', 'u', 0.8, true, 0.7, 7, 49);

create table historial_stock(
	codigo_his serial not null,
    fecha timestamp not null,
    referencia varchar(100) not null,
    producto int not null,
    cantidad int not null,
    constraint historial_stock_pk primary key(codigo_his),
    constraint his_productos_fk foreign key (producto) references productos(codigo_prod)
);

insert into historial_stock(fecha, referencia, producto, cantidad)
values('20/11/2023 19:59', 'Pedido1', 1, 100),
('20/11/2023 19:59', 'Pedido1', 4, 50),
('20/11/2023 20:00', 'Pedido2', 1, 10),
('20/11/2023 20:00', 'Venta1', 1, -5),
('20/11/2023 20:00', 'Venta1', 4, -1);

create table cabecera_ventas(
	codigo_cv serial not null,
    fecha timestamp not null,
    total_sin_IVA decimal not null,
    IVA decimal not null,
    total decimal not null,
    constraint cabecera_ventas_pk primary key(codigo_cv)
);

insert into cabecera_ventas(fecha, total_sin_IVA, IVA, total)
values('20/11/2023 20:00', 3.26, 0.39, 3.65);

create table detalle_ventas(
	codigo_dv serial not null,
    cabecera_ventas int not null,
    producto int not null,
    cantidad int not null,
    precio_venta decimal not null,
    subtotal decimal not null,
    subtotal_IVA decimal not null,
    constraint detalle_pk primary key(codigo_dv),
    constraint detalle_cv_fk foreign key (cabecera_ventas) references cabecera_ventas(codigo_cv),
    constraint detalle_productos_fk foreign key (producto) references productos(codigo_prod)
);

insert into detalle_ventas(cabecera_ventas, producto, cantidad, precio_venta, subtotal, subtotal_IVA)
values(1, 1, 5, 0.58, 2.9, 3.25),
(1, 4, 1, 0.36, 0.36, 0.4);

create table estados_pedidos(
	codigo_ep char(1) not null,
    descripcion varchar(100) not null,
    constraint estados_pedidos_pk primary key(codigo_ep)
);

insert into estados_pedidos(codigo_ep, descripcion)
values('S', 'Solicitado'),
('R', 'Recibido');

create table tipo_documentos(
	codigo char(1) not null,
    descripcion varchar(100) not null,
    constraint tipo_documentos_pk primary key(codigo)
);

insert into tipo_documentos(codigo, descripcion)
values('C', 'Cedula'),
('R', 'RUC');

create table proveedores(
	identificador varchar(100) not null,
    tipo_documento char(1) not null,
    nombre varchar(100) not null,
    telefono varchar(100) not null,
    correo varchar(100) not null,
    direccion varchar(100) not null,
    constraint proveedores_pk primary key(identificador),
    constraint proveedores_documento_fk foreign key (tipo_documento) references tipo_documentos(codigo)
);

insert into proveedores(identificador, tipo_documento, nombre, telefono, correo, direccion)
values('179228574', 'C', 'Santiago Mosquera', '0992920306', 'zantycb89@gmail.com', 'Cumbayork'),
('179228574001', 'R', 'Snacks SA', '0992920306', 'snacks@gmail.com', 'La Tola');

create table cabecera_pedido(
	numero serial not null,
    proveedor varchar(100) not null,
    fecha timestamp not null,
    estado char(1) not null,
    constraint cabecera_pedido_pk primary key(numero),
    constraint cabecera_p_proveedores_fk foreign key (proveedor) references proveedores(identificador),
    constraint cabecera_p_estados_fk foreign key (estado) references estados_pedidos(codigo_ep)
);

insert into cabecera_pedido(proveedor, fecha, estado)
values('179228574', '20/11/2023', 'R'),
('179228574', '20/11/2023', 'R');

create table detalle_pedido(
	codigo serial not null,
    cabecera_pedido int not null,
    producto int not null,
    cantidad_solicitada int not null,
    cantidad_recibida int not null,
	subtotal money not null,
    constraint detalle_pedido_pk primary key(codigo),
    constraint detalle_cp_fk foreign key (cabecera_pedido) references cabecera_pedido(numero),
    constraint detalle_productos_fk foreign key (producto) references productos(codigo_prod)
);

insert into detalle_pedido(cabecera_pedido, producto, cantidad_solicitada,  cantidad_recibida, subtotal)
values(1, 1, 100, 100, 373.29),
(1, 4, 50, 50, 11.8),
(2, 1, 10, 10, 3.73);

select * from categorias;
select * from categoria_unidad_medida;
select * from unidades_medida;
select * from productos;
select * from historial_stock;
select * from cabecera_ventas;
select * from detalle_ventas;
select * from estados_pedidos;
select * from tipo_documentos;
select * from proveedores;
select * from cabecera_pedido;
select * from detalle_pedido;

select prov.identificador, prov.tipo_documento, td.descripcion, prov.nombre, prov.telefono, prov.correo, prov.direccion
	+ "from proveedores prov, tipo_documentos td
					+ "where prov.tipo_documento=td.codigo "
					+ "and upper(nombre) like ?

					

select prov.identificador as identificador, prov.nombre as nombre, cp.fecha as fecha, ep.descripcion as estado, prod.nombre as producto, dp.cantidad_solicitada, dp.cantidad_recibida, dp.subtotal
from proveedores prov, cabecera_pedido cp, detalle_pedido dp, productos prod, estados_pedidos ep
where identificador=proveedor
and numero=cabecera_pedido
and codigo_prod=producto
and codigo_ep=estado
and identificador='179228574'

DELETE FROM historial_stock 
WHERE codigo_his IN (6, 7);

select prod.codigo_prod, prod.nombre as nombre_producto, udm.nombre as nombre_udm, udm.descripcion as descripcion_udm,
cast(prod.precio_venta as decimal(6,2)), prod.tiene_iva, cast(prod.coste as decimal(5,4)), prod.categoria, cat.nombre as nombre_categoria, prod.stock 
from productos prod, unidades_medida udm, categorias cat
where prod.udm = udm.nombre
and prod.categoria = cat.codigo_cat
and upper(prod.nombre) like '%M%'


update cabecera_pedido set estado='S' where codigo=7

update detalle_pedido set cantidad_recibida=40, subtotal=20
where codigo=5