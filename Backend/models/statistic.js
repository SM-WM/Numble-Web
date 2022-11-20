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
            maxStreak
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING id, user_id, played, previous, winpcnt, streak, maxStreak;
        `,
        [
            statistics.userId,
            statistics.played,
            statistics.previous,
            statistics.winpcnt,
            statistics.streak,
            statistics.maxStreak,
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
