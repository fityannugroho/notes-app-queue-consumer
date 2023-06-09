const { Pool } = require('pg');

class NotesService {
  constructor() {
    /**
     * @type {Pool}
     */
    this._pool = new Pool();
  }

  /**
   * Get all user notes.
   * @param {string} userId
   */
  async getNotes(userId) {
    const result = await this._pool.query({
      text: `SELECT notes.* FROM notes
        LEFT JOIN collaborations ON collaborations.note_id = notes.id
        WHERE notes.owner = $1 OR collaborations.user_id = $1
        GROUP BY notes.id`,
      values: [userId],
    });

    return result.rows;
  }
}

module.exports = NotesService;
