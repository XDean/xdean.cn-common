import {database} from 'common/api/database';
import {OkPacket} from 'mysql';
import {Like} from './domain';

export async function getLike(params: {
  objId: string
  userId: number
}): Promise<Like> {
  const {objId, userId} = params;
  const sql = `SELECT COUNT(*) AS total, IFNULL(SUM(user_id = ?), 0) AS you 
      FROM xdean.obj_likes 
      WHERE obj_id = ?`;
  const result = await database.query<{ total: number, you: number }[]>(sql, [userId, objId]);
  if (result.length === 0) {
    return {
      total: 0,
      you: false,
    };
  }
  return {
    total: result[0].total,
    you: result[0].you > 0,
  };
}

export async function setLike(params: {
  objId: string
  userId: number
  like: boolean
}) {
  const {objId, userId, like} = params;
  if (like) {
    const sql = `INSERT IGNORE INTO xdean.obj_likes(obj_id, user_id)
                 VALUES (?, ?)`;
    await database.query<OkPacket>(sql, [objId, userId]);
    return null;
  } else {
    const sql = `DELETE FROM xdean.obj_likes WHERE obj_id = ? AND user_id=?`;
    await database.query<OkPacket>(sql, [objId, userId]);
    return null;
  }
}