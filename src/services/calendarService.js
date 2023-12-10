export default class CalendarService {
    constructor(db) {
        this.db = db;
        this.days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    }

    shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        while (currentIndex != 0) {
      
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    validateDate = (req, res, next) => {
        const { day } = req.body;
        let date = new Date();
        let currentDay = date.getDate();
        console.log(currentDay, day);

        if (!day) {
            return res.status(400).json({ Error: 'Missing fields' });
        }
        if (day < 1 || day > 24) {
            return res.status(400).json({ Error: 'Invalid day' });
        }
        if (day <= currentDay) {
            next();
        }
        else {
            return res.status(400).json({ Error: ':D' });
        }
    }

    openDay = async (req, res) => {
        const { id, day} = req.body;
        if (!id || !day) {
            return res.status(400).json({ Error: 'Missing fields' });
        }

        const sql = `UPDATE calendars SET day${day}_is_open = true WHERE user_id = ${id} RETURNING day${day} AS id`;
        try {
            const day_id = await this.db.query(sql);
            const sql2 = `SELECT msg FROM msg WHERE id = ${day_id.rows[0].id}`;
            const result = await this.db.query(sql2);
            return res.status(200).json({ msg: result.rows[0].msg });
        } catch (err) {
            return res.status(400).json({Error: err})
        }
    }

    get = async (req, res) => {
        const { id, day} = req.body;
        if (!id || !day) {
            return res.status(400).json({ Error: 'Missing fields' });
        }

        const sql = `SELECT day${day}_is_open as day FROM calendars WHERE user_id = ${id}`;
        try {
            const result = await this.db.query(sql);
            return res.status(200).json({ day: result.rows[0].day });
        } catch (err) {
            return res.status(400).json({Error: err})
        }
    }

    generate = async (id) => {
        const randomized_list = this.shuffle(this.days);

        const sql = `INSERT INTO calendars (user_id, day1, day2, day3, day4, day5, day6, day7, day8, day9, day10, day11, day12, day13, day14, day15, day16, day17, day18, day19, day20, day21, day22, day23, day24) VALUES (${id}, ${randomized_list[0]}, ${randomized_list[1]}, ${randomized_list[2]}, ${randomized_list[3]}, ${randomized_list[4]}, ${randomized_list[5]}, ${randomized_list[6]}, ${randomized_list[7]}, ${randomized_list[8]}, ${randomized_list[9]}, ${randomized_list[10]}, ${randomized_list[11]}, ${randomized_list[12]}, ${randomized_list[13]}, ${randomized_list[14]}, ${randomized_list[15]}, ${randomized_list[16]}, ${randomized_list[17]}, ${randomized_list[18]}, ${randomized_list[19]}, ${randomized_list[20]}, ${randomized_list[21]}, ${randomized_list[22]}, ${randomized_list[23]})`;
        try {
            await this.db.query(sql);
        } catch (err) {
            return res.status(400).json({Error: err})
        }
    };
}