import conn from '../../../lib/db'

const MyApi = async (req, res) => {
    try {
      if (req.method === 'GET') {
        const query = 'SELECT * FROM sensor_data';
        const result = await conn.query(query);
  
        res.status(200).json(result.rows);
      } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
      }
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};
export default MyApi;