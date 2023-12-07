/*Postgres*/
Create table if not exists users (
    id serial primary key,
    username varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    created_at timestamp not null default now(),
);

Create table if not exists calendars(
    user_id int not null,
    msg varchar(255) not null,
)