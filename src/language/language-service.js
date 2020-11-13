const { LinkedList }= require('./LinkedList')

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

  //address if doesnt work later
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

  populateLL(language, words) {
    const linkedList = new LinkedList();
    linkedList.id = language.id;
    linkedList.name = language.name;
    linkedList.total_score = language.total_score;
    let word = words.find(w => w.id === language.head)
    linkedList.insertFirst({
      id: word.id,
      original: word.original,
      translation: word.translation,
      memory_value: word.memory_value,
      correct_count: word.correct_count,
      incorrect_count: word.incorrect_count,
    })
    while (word.next) {
      word = words.find(w => w.id === word.next)
      linkedList.insertLast({
        id: word.id,
        original: word.original,
        translation: word.translation,
        memory_value: word.memory_value,
        correct_count: word.correct_count,
        incorrect_count: word.incorrect_count,
      })
    }
    // console.log(JSON.stringify(linkedList, null, 2));
    return linkedList
  },
 

  maintainLL(db, languageList) {
    const wordsArr = languageList.listNodes()
    return db.transaction(async (trx) => {
      await Promise.all([
        await trx('language')
          .where({ id: languageList.id })
          .update({
            total_score: languageList.total_score,
            head: languageList.head.value.id
          }),
        ...wordsArr.map(word => {
          return trx('word')
            .where('id', word.value.id)
            .update({
              memory_value: word.value.memory_value > languageList.listLength() ? languageList.listLength() : word.value.memory_value,
              correct_count: word.value.correct_count,
              incorrect_count: word.value.incorrect_count,
              next: word.next ? word.next.value.id : null,
            })
        })
      ])
    })
  }  

}

module.exports = LanguageService
