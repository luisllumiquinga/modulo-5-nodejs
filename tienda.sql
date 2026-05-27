
drop table if exists detalle_ventas;
drop table if exists ventas;
drop table if exists clientes;
drop table if exists productos;


create table clientes(
	id_cliente serial not null,
    nombre varchar(100) not null,
    telefono varchar(10) not null,
	direccion varchar(100) not null,
	email varchar(100) not null,
    constraint clientes_pk primary key(id_cliente)
);

insert into clientes(nombre, telefono, direccion, email)
values('Juan Perez', '0991234', 'Quito', 'juan@mail.com'),
('Maria Gomez', '0995678', 'Guayaquil', 'maria@mail.com');


create table productos(
	id_producto int not null,
    nombre_producto varchar(100) not null,
    categoria varchar(100) not null,
	precio decimal not null,
	stock int not null,
    constraint productos_pk primary key(id_producto)
);

insert into productos(id_producto, nombre_producto, categoria, precio, stock)
values(101, 'Laptop HP', 'Computadoras', 750.99, 10),
(102, 'Mouse Logitech', 'Accesorios', 25.5, 50),
(103, 'Teclado Razer', 'Accesorios', 89.99, 20);

create table ventas(
	id_venta int not null,
    cantidad int not null,
    fecha_compra  timestamp not null,
	id_cliente int not null,
    constraint ventas_pk primary key(id_venta),
	constraint ventas_clientes_fk foreign key (id_cliente) references clientes(id_cliente)
);

insert into ventas(id_venta, cantidad, fecha_compra, id_cliente)
values(5001, 1, '2024-02-25', 1),
(5002, 1, '2024-02-24', 2),
(5003, 1, '2024-02-20', 1);

create table detalle_ventas(
	id_detalle serial not null,
    id_venta int not null,
    id_producto int not null,
	cantidad int not null,
    constraint detalle_pk primary key(id_detalle),
	constraint detalle_venta_fk foreign key (id_venta) references ventas(id_venta),
	constraint detalle_producto_fk foreign key (id_producto) references productos(id_producto)
);

select * from clientes;
select * from productos;
select * from ventas;