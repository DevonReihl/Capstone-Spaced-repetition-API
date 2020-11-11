const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first()
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id })
  },

  getWordHead(db, language_id) {
    let response = db.raw(
      'select * from word join language on language.head = word.id where word.language_id = ?',
      language_id
    )
    .then(rowsAffected => {
      return rowsAffected.rows[0];
    })
    return response
  },
}

module.exports = LanguageService
