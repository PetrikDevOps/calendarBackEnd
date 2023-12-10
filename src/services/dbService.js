import pkg from 'pg';
const { Client } = pkg;

export default class dbService {
    constructor() {
        this.client = new Client({
            host: process.env.DB_HOST || 'calendar-db-1',
            port: parseInt(process.env.DB_PORT || '5432'),
            database: process.env.POSTGRES_DB || 'calendar',
            user: process.env.POSTGRES_USER || 'Petrik',
            password: process.env.POSTGRES_PASSWORD || 'Petrik23'
        });

        this.connectToDB();
    }

    connectToDB = async () => {
        try {
            await this.client.connect();
            console.log('Connected to the database');
        } catch (error) {
            console.error('Error connecting to the database:', error.message);
        }
    }

    msg = async () => {
        try {
            await this.query(`DROP TABLE IF EXISTS msg;`);
            await this.query(`Create table if not exists msg(
                id serial primary key,
                msg varchar(255) not null
            );`);
            await this.query(`INSERT INTO public.msg (id,msg) VALUES
            (1,'https://purepng.com/public/uploads/large/purepng.com-red-porsche-911-carrera-carcarvehicletransportporsche-961524669275lrfxn.png'),
            (7,'https://www.freeiconspng.com/thumbs/iphone-x-pictures/apple-iphone-x-pictures-5.png'),
            (13,'https://static.wikia.nocookie.net/fortnite/images/6/6c/Unreal_-_Icon_-_Fortnite.png/revision/latest/scale-to-width-down/250?cb=20230531201239'),
            (14,'https://nzxt.com/assets/cms/34299/1681872504-core-fans-latest-releases-primary.png?auto=format&fit=max&h=900&w=672'),
            (15,'https://images-tastehub.mdlzapps.cloud/images/f2d4aecb-a1d5-477f-841c-5de334f0c48b.png?fm=webp&q=80'),
            (16,'https://www.vitalpont.eu/wp-content/uploads/2020/06/BIOTECH-VEGAN-PROTEIN-500G-300x300.png'),
            (17,'https://gazleysuzuki.com/images/models/swift/base/gl-auto.png'),
            (24,'https://s3-us-west-2.amazonaws.com/media.brothers-brick.com/2023/09/75367_UCSVenator_7_2TPJ7.png'),
            (2,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (3,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (4,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (5,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (6,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (8,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (9,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (10,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (11,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (12,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (18,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (20,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (21,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (22,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (23,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png'),
            (19,'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/HD_transparent_picture.png/800px-HD_transparent_picture.png');`);  
            console.log('Table "msg" created');     
        } catch (error) {
            console.error('Error creating table "msg":', error.message);
        }
    }

    users = async () => {
        try {
            await this.query(`Create table if not exists users (
                id serial primary key,
                username varchar(255) not null,
                email varchar(255) not null,
                password varchar(255) not null,
                created_at timestamp not null default now()
            );`);
            console.log('Table "users" created');
        } catch (error) {
            console.error('Error creating table "users":', error.message);
        }
    }

    calendars = async () => {
        try{
            await this.query(`Create table if not exists calendars(
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
            );`);
            console.log('Table "calendars" created');
        }
        catch (error) {
            console.error('Error creating table "calendars":', error.message);
        }
    }

    init = async () => {
        try {
            await this.msg();
            await this.users();
            await this.calendars();
        }
        catch (error) {
            console.error('Error initializing database:', error.message);
        }
            
    }

    query = async (query) => {
        try {
            const result = await this.client.query(query);
            return result;
        } catch (error) {
            console.error('Error executing query:', error.message);
        }
    }
}
