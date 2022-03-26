import {database} from '../database';
import {ObjStat} from './domain';

export async function getObjStats(params: {
  objIds: string[]
  userId: number
}) {
  const {objIds, userId} = params;
  const inStr = objIds.map(e => `'${e}'`).join(', ');
  const selectSql = `SELECT TR.obj_id           AS \`id\`,
       TR.unique_total     AS \`unique_read\`,
       TR.total            AS \`read\`,
       IFNULL(TL.total, 0) AS \`like\`,
       IFNULL(TL.you, 0)   AS \`liked\`
FROM (
         SELECT obj_id, COUNT(*) AS unique_total, SUM(count) AS total
         FROM xdean.obj_reads
         WHERE obj_id IN (${inStr})
         GROUP BY obj_id
     ) TR
         LEFT OUTER JOIN
     (
         SELECT obj_id, COUNT(*) AS total, IFNULL(SUM(user_id = ${userId}), 0) AS you
         FROM xdean.obj_likes
         WHERE obj_id IN (${inStr})
         GROUP BY obj_id
     ) TL ON TR.obj_id = TL.obj_id;
     `;
  return await database.query<ObjStat[]>(selectSql);
}