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
    day1 smallint not null,
    day2 smallint not null,
    day3 smallint not null,
    day4 smallint not null,
    day5 smallint not null,
    day6 smallint not null,
    day7 smallint not null,
    day8 smallint not null,
    day9 smallint not null,
    day10 smallint not null,
    day11 smallint not null,
    day12 smallint not null,
    day13 smallint not null,
    day14 smallint not null,
    day15 smallint not null,
    day16 smallint not null,
    day17 smallint not null,
    day18 smallint not null,
    day19 smallint not null,
    day20 smallint not null,
    day21 smallint not null,
    day22 smallint not null,
    day23 smallint not null,
    day24 smallint not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

Create table if not exists msg(
    id serial primary key,
    msg varchar(255) not null,
);

