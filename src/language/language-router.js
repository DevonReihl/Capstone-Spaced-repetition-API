const express = require('express')
const LanguageService = require('./language-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jsonBodyParser = express.json()
const { LinkedList } = require('./LinkedList') 
const xss = require('xss')

const languageRouter = express.Router()

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      )

      if (!language)
        return res.status(404).json({
          error: `You don't have any languages`,
        })

      req.language = language
      next()
    } catch (error) {
      next(error)
    }
  })

languageRouter
  .get('/', async (req, res, next) => {
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )

      res.json({
        language: req.language,
        words,
      })
  
    } catch (error) {
      next(error)
    }
  })

languageRouter
.get('/head', async (req, res, next) => {
  try {
    const head = await LanguageService.getWordHead(
      req.app.get('db'),
      req.language.id,
    )
    let wordHead = {
      totalScore: head.total_score,
      wordCorrectCount: head.correct_count,
      wordIncorrectCount: head.incorrect_count,
      nextWord: head.original,
    }
    res.send(wordHead)
    next()
  }
  catch(error) {
    next(error)
  }
})

languageRouter
  .post('/guess', jsonBodyParser, async (req, res, next) => {
    
    // try {
    //   const { guess } = req.body
    //   if (!guess)
    //     return res.status(400).json({
    //       error: `Missing 'guess' in request body`
    //     })
        
    //   const words = await LanguageService.getLanguageWords(
    //     req.app.get('db'),
    //     req.language.id,
    //   )
    //   const languageList = LanguageService.populateLL(
    //     req.language,
    //     words,
    //   )
    //   const node = languageList.head
    //   const answer = node.value.translation

    
    //   let isCorrect
    //   if (guess === answer) {
    //     isCorrect = true

    //     languageList.head.value.memory_value = Number(node.value.memory_value) * 2
    //     languageList.head.value.correct_count = Number(languageList.head.value.correct_count) + 1
    //     languageList.total_score = Number(languageList.total_score) + 1
    //   } else {
    //     isCorrect = false
    //     languageList.head.value.memory_value = 1
    //     languageList.head.value.incorrect_count = Number(languageList.head.value.incorrect_count) + 1
    //   }

    //   languageList.moveHeadBy(languageList.head.value.memory_value)

    //   await LanguageService.maintainlanguageList(
    //     req.app.get('db'),
    //     languageList,
    //   )
    //   res.json({
    //     nextWord: languageList.head.value.original,
    //     wordCorrectCount: languageList.head.value.correct_count,
    //     wordIncorrectCount: languageList.head.value.incorrect_count,
    //     totalScore: languageList.total_score,
    //     answer,
    //     isCorrect,
    //   })
    // } catch (error) {
    //   next(error)
    // }
    try {
      const { guess } = req.body
      if (!guess)
        return res.status(400).json({
          error: `Missing 'guess' in request body`
        })
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      )
      const linkedList = LanguageService.populateLL(
        req.language,
        words,
      )
      const node = linkedList.head
      const answer = node.value.translation
      let isCorrect
      if (guess === answer) {
        isCorrect = true
        linkedList.head.value.memory_value = Number(node.value.memory_value) * 2
        linkedList.head.value.correct_count = Number(linkedList.head.value.correct_count) + 1
        linkedList.total_score = Number(linkedList.total_score) + 1
      } else {
        isCorrect = false
        linkedList.head.value.memory_value = 1
        linkedList.head.value.incorrect_count = Number(linkedList.head.value.incorrect_count) + 1
      }
      linkedList.moveHeadBy(linkedList.head.value.memory_value)
      await LanguageService.maintainLL(
        req.app.get('db'),
        linkedList,
      )
      res.json({
        nextWord: linkedList.head.value.original,
        wordCorrectCount: linkedList.head.value.correct_count,
        wordIncorrectCount: linkedList.head.value.incorrect_count,
        totalScore: linkedList.total_score,
        answer,
        isCorrect,
      })
    } catch (error) {
      next(error)
    }
  });

module.exports = languageRouter
