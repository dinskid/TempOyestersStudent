const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const db = require('../config/connection');

router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      'SELECT session_id,session_name,session_tagline,session_tags,session_fee,session_thumbnail FROM session_tables WHERE session_type="recorded session"',
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

router.get('/details/:id', verifyToken, async (req, res) => {
  try {
    console.log(req.params.id);
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'session id not provided',
      });
    const result = await db.query(
      `SELECT 
      session_name,
      session_description,
      session_thumbnail,
      session_fee,
      session_duration,
      chapter_learnings
      from session_tables as s INNER JOIN chapter_tables as c where s.session_id=c.session_id AND s.session_id=${req.params.id} `,
      { type: db.QueryTypes.SELECT }
    );

    console.log(result);
    if (!result || !result.length) {
      try {
        const onlySession = await db.query(
          `SELECT 
      session_name,
      session_description,
      session_thumbnail,
      session_fee,
      session_duration
      from session_tables  WHERE session_id=${req.params.id}`,
          { type: db.QueryTypes.SELECT }
        );
        console.log(onlySession);
        if (!onlySession)
          return res.status(400).json({
            success: 0,
            error: 'Requested session does not exists',
          });
        onlySession[0].chapter_learnings = [];
        return res.status(200).json({
          success: 1,
          session: onlySession[0],
        });
      } catch (e) {
        return res.status(400).json({
          success: 0,
          error: 'Could not fetch details',
        });
      }
      // return res.status(400).json({
      //   success: 0,
      //   error: 'Requested session does not exists',
      // });
    }

    const chapter_learnings = result.map((doc) => doc.chapter_learnings);

    const session = {
      session_name: result[0].session_name,
      session_description: result[0].session_description,
      session_thumbnail: result[0].session_thumbnail,
      session_fee: result[0].session_fee,
      session_duration: result[0].session_duration,
      chapter_learnings,
    };

    console.log(session);

    return res.status(200).json({ success: 1, session });
  } catch (err) {
    console.log(err);

    return res.status(400).json({
      success: 0,
      error: 'Could not fetch details',
    });
  }
});
module.exports = router;
