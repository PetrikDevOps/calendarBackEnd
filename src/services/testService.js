export default class TestService {
    constructor(db) {
        this.db = db;
    }

    test = async (req, res) => {
        const { msg } = req.body;
        try {
            const result = await this.db.query(`Insert into msg (msg) values ('${msg}')`);
            return res.status(200).json(result.rows);
        } catch (error) {
            return res.status(400).json({ Error: 'Error testing' });
        }
    }
}