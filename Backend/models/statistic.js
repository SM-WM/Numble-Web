const db = require("../db");
const { BadRequestError, UnauthorizedError } = require("../utils/errors");


class Statistic {

  static async postStats(statistics) {
    const result = await db.query(
        `
        INSERT INTO statistics(
            user_id,
            played,
            previous,
            winpcnt,
            streak,
            maxStreak,
            wins
        )
        VALUES ($1,$2,$3,$4,$5,$6,$7)
        RETURNING id, user_id, played, previous, winpcnt, streak, maxStreak,wins;
        `,
        [
            statistics.userId,
            statistics.played,
            statistics.previous,
            statistics.winpcnt,
            statistics.streak,
            statistics.maxStreak,
            statistics.wins
        ]
    )
    const res = result.rows[0]
    
    return res
  }

  static async updateStats(statistics, id){
    const result = await db.query(
      `
      UPDATE statistics
      SET played=$1,
          previous=$2,
          winpcnt=$3,
          streak=$4,
          maxStreak=$5,
          wins=$6
      WHERE user_id=$7
      RETURNING id,user_id,played,previous,winpcnt,streak,maxStreak,wins;
      `,
      [
        statistics.played,
        statistics.previous,
        statistics.winpcnt,
        statistics.streak,
        statistics.maxstreak,
        statistics.wins,
        id
      ]
    )

    const res = result.rows[0]

    return res
  }

  static async getStats(id){
    const result = await db.query(
        `
        SELECT * FROM statistics
        WHERE user_id =` + id + `;`    
    
    )

    const res = result.rows[0]

    return res
  }
}

module.exports = Statistic;
