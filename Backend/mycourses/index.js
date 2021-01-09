const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');
const db = require('../config/connection');

router.get('/:id', verifyToken, async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({
        success: 0,
        error: 'Session id not provided',
      });

    const sql = `SELECT  
      c.chapter_id,
      chapter_number,
      chapter_name,
      l.lesson_id,
      lesson_number,
      lesson_name ,
      lesson_video_id,
      lesson_assignment_id,
      lesson_quiz_id,
      lesson_handouts_id
      FROM  chapter_tables as c
      INNER JOIN lesson_tables as l
      ON c.session_id=l.session_id AND c.session_id=${req.params.id} AND c.chapter_id=l.chapter_id AND c.chapter_id=l.chapter_id`;

    const result = await db.query(sql, { type: db.QueryTypes.SELECT });
    console.log(result);
    if (!result)
      return res.status(400).json({
        success: 0,
        error: 'Unable to find course details',
      });

    const sql2 = `SELECT session_name,session_tags,session_start_time from session_tables WHERE session_id=${req.params.id}`;
    const sessionData = await db.query(sql2, { type: db.QueryTypes.SELECT });

    if (!sessionData)
      return res.status(400).json({
        success: 0,
        error: 'could not fetch details',
      });
    const ans = [];

    const getIndex = (doc) => {
      for (let i = 0; i < ans.length; i++)
        if (ans[i].chapter_number === doc.chapter_number) return i;
      return -1;
    };

    result.forEach((doc) => {
      const index = getIndex(doc);
      if (index === -1) {
        const lessons = {
          id: doc.lesson_number,
          lesson_id: doc.lesson_id,
          name: doc.lesson_name,
          video: doc.lesson_video_id,
          assignment: doc.lesson_assignment_id,
          quiz: doc.lesson_quiz_id,
          thumbnail: doc.lesson_handouts_id,
        };
        ans.push({
          chapter_id: doc.chapter_id,
          chapter_number: doc.chapter_number,
          learning: doc.chapter_learnings,
          name: doc.chapter_name,
          lesson: [lessons],
        });
      } else {
        ans[index].lesson.push({
          id: doc.lesson_number,
          lesson_id: doc.lesson_id,
          name: doc.lesson_name,
          video: doc.lesson_video_id,
          assignment: doc.lesson_assignment_id,
          quiz: doc.lesson_quiz_id,
          thumbnail: doc.lesson_handouts_id,
        });
      }
    });
    return res.status(200).json({
      success: 1,
      sessionData: sessionData[0],
      ans,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: 0,
      error: 'Unable to find courses',
      errorReturned: JSON.stringify(err),
    });
  }
});

module.exports = router;
