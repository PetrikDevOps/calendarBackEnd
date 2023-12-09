/*Postgres*/
Create table if not exists users (
    id serial primary key,
    username varchar(255) not null,
    email varchar(255) not null,
    password varchar(255) not null,
    created_at timestamp not null default now()
);

Create table if not exists calendars(
    user_id int not null,
    day1 smallint not null,
    day1_is_open boolean not null default false,
    day2 smallint not null,
    day2_is_open boolean not null default false,
    day3 smallint not null,
    day3_is_open boolean not null default false,
    day4 smallint not null,
    day4_is_open boolean not null default false,
    day5 smallint not null,
    day5_is_open boolean not null default false,
    day6 smallint not null,
    day6_is_open boolean not null default false,
    day7 smallint not null,
    day7_is_open boolean not null default false,
    day8 smallint not null,
    day8_is_open boolean not null default false,
    day9 smallint not null,
    day9_is_open boolean not null default false,
    day10 smallint not null,
    day10_is_open boolean not null default false,
    day11 smallint not null,
    day11_is_open boolean not null default false,
    day12 smallint not null,
    day12_is_open boolean not null default false,
    day13 smallint not null,
    day13_is_open boolean not null default false,
    day14 smallint not null,
    day14_is_open boolean not null default false,
    day15 smallint not null,
    day15_is_open boolean not null default false,
    day16 smallint not null,
    day16_is_open boolean not null default false,
    day17 smallint not null,
    day17_is_open boolean not null default false,
    day18 smallint not null,
    day18_is_open boolean not null default false,
    day19 smallint not null,
    day19_is_open boolean not null default false,
    day20 smallint not null,
    day20_is_open boolean not null default false,
    day21 smallint not null,
    day21_is_open boolean not null default false,
    day22 smallint not null,
    day22_is_open boolean not null default false,
    day23 smallint not null,
    day23_is_open boolean not null default false,
    day24 smallint not null,
    day24_is_open boolean not null default false,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

Create table if not exists msg(
    id serial primary key,
    msg varchar(255) not null
);

