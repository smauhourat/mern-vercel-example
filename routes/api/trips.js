const moment = require('moment');
const express = require('express');
const router = express.Router();

const Trip = require('../../models/Trip');

// @route    GET api/trips/?q&df=&dt&limit&page
// @desc     Get Trips by query
// @access   Public
router.get('/',
  async (req, res) => {
    try {
      const currentDate = new Date();

      const query = req.query.q ? req.query.q : "";
      const dateFrom = req.query.df ? req.query.df : "1900-01-01";
      const dateTo = req.query.dt ? req.query.dt : moment(currentDate).add(5, 'year').format('YYYY-MM-DD');
      const limit = req.query.limit && !isNaN(req.query.limit) ? parseInt(req.query.limit) : 100;
      let page = 1;
      if (req.query.page && !isNaN(req.query.page) && parseInt(req.query.page) > 0)
        page = parseInt(req.query.page);

      const sort = req.query.sort ? req.query.sort : "date";
      const order = req.query.order ? req.query.order : "-1";
      const category = req.query.category ? req.query.category : "";
      const published = req.query.published ? (req.query.published == 1) : "";

      let db_query = {
        date: { $gte: new Date(dateFrom), $lt: new Date(dateTo) },
        $or: [
          { title: { $regex: query, '$options': 'i' } },
          { subtitle: { $regex: query, '$options': 'i' } },
          { description: { $regex: query, '$options': 'i' } },
          { location: { $regex: query, '$options': 'i' } },
        ]
      };

      if (category !== "")
        db_query = { ...db_query, category: category }
      if (published !== "")
        db_query = { ...db_query, published: published }

      const totalItems = await Trip
        .find(db_query)
        .countDocuments();

      const trips = await Trip
        .find(db_query)
        .limit(limit)
        .skip(limit * (page - 1))
        .sort({ [sort]: order });

      res.json({
        "metadata": {
          "query": query,
          "total": totalItems,
          "count": trips.length,
          "limit": limit,
          "page": page,
          "dateFrom": dateFrom,
          "dateTo": dateTo
        },
        "data": trips
      });

      if (!trips) {
        return res.status(404).json({ msg: 'Evento no encontrado' });
      }
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  });

module.exports = router;