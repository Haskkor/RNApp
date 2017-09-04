declare namespace ReduxState {
  type RootState = {
    session: Session,
    container: {
      App: AppContainer,
      Conversation: ConversationContainer,
    }
    entities: {
      questionBlocks: { [id: string]: ServerEntity.QuestionBlock },
      questions: { [id: string]: ServerEntity.Question }
    }
  }

  type AppContainer = {
    mainControl: ServerEntity.MainControl | undefined,
    questionLoaded: boolean
  }
  type ConversationContainer = { }
  type Session = {
    currentBlock: string,
    currentQuestion: string,
    answers: { [id: string]: ServerEntity.Answer },
    path: string[]
  }
}
