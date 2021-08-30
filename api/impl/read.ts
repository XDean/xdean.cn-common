import {database} from "../database";
import {OkPacket} from "mysql";
import {Read} from "./domain";

export async function getRead(params: {
  objId: string
  userId: number
}): Promise<Read> {
  const {userId, objId} = params
  const insertSql = `INSERT IGNORE INTO xdean.obj_reads(obj_id, user_id)
                     VALUES (?, ?)`
  await database.query<OkPacket>(insertSql, [objId, userId])

  const selectSql = `SELECT COUNT(*) AS total
      FROM xdean.obj_reads 
      WHERE obj_id = ?`;
  const result = await database.query<{ total: number }[]>(selectSql, [objId])
  return result[0]
}