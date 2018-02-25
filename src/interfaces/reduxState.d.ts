declare namespace ReduxState {
  type RootState = {
    session: Session,
    container: {
      App: AppContainer
    }
    entities: {
      programs: Programs
    }
  }

  type AppContainer = {}

  type Session = {}

  type Programs = { [id: string]: ServerEntity.Program }
}
