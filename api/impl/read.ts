import {OkPacket} from 'mysql';
import {database} from '../database';
import {Read} from './domain';


export async function getRead(params: {
  objId: string
  userId: number
}): Promise<Read> {
  await addRead(params);
  return await getReadOnly(params);
}

export async function getReadOnly(params: {
  objId: string
}): Promise<Read> {
  const {objId} = params;
  const selectSql = `SELECT COUNT(*) AS unique_total, SUM(count) AS total
      FROM xdean.obj_reads 
      WHERE obj_id = ?`;
  const result = await database.query<Read[]>(selectSql, [objId]);
  return result[0];
}

export async function addRead(params: {
  objId: string
  userId: number
}) {
  const {userId, objId} = params;
  const insertSql = `INSERT INTO xdean.obj_reads(obj_id, user_id)
                     VALUES (?, ?)
                     ON DUPLICATE KEY UPDATE count = IF(TIMESTAMPDIFF(SECOND, last_modified, CURRENT_TIMESTAMP) > 1800,
                                                        count + 1, count)`;
  await database.query<OkPacket>(insertSql, [objId, userId]);
}