const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const db = require('../config/connection');

router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT session_id,session_type,session_name,session_tagline,session_description,session_tags,session_fee,session_thumbnail FROM session_tables',
      { type: db.QueryTypes.SELECT }
    );
    if (!result)
      return res.status(400).json({
        success: 0,
        error: 'could not fetch session data',
      });
    return res.status(200).json({
      success: 1,
      sessions: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      error: 'unable to find sessions',
      errorReturned: JSON.stringify(err),
    });
  }
});

router.get('/live', verifyToken, async (req, res) => {
  console.log(req.url);
  try {
    const result = await db.query(
      'SELECT session_id,session_name,session_description,session_tagline,session_tags,session_fee,session_thumbnail FROM session_tables WHERE session_type="live session"',
      { type: db.QueryTypes.SELECT }
    );
    if (!result)
      return res.status(400).json({
        success: 0,
        error: 'could not fetch session data',
      });

    return res.status(200).json({
      success: 1,
      sessions: result,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      error: 'unable to find sessions',
      errorReturned: JSON.stringify(err),
    });
  }
});
module.exports = router;
