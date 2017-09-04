declare namespace ServerEntity {
  type Profile = {
    firstName: string | undefined,
    email: string | undefined,
    password: string | undefined,
    confirmPassword: string | undefined,
    age: number | undefined,
    investingReason: string | undefined,
    purchasePlan: string | undefined,
    financialExperience: boolean | undefined,
    tradingExperienceByYears: string | undefined,
    annualIncome: number | undefined,
    incomeSource: string[] | undefined,
    investmentStrategy: string[] | undefined,
    quitTime: string | undefined,
    unknownQuestion: string | undefined,
  }

  /* QuestionBlock */
  type LogicRule = {
    condition: string, // true then show targets, false then hide targets
    targets: string[],
  }

  type QuestionBlock = {
    id: string,
    contentIds: string[],
    rules: LogicRule[],
  }

  type MainControl = QuestionBlock

  /* Question types */
  type ButtonQuestion = {
    id: string,
    sentences: string[],
    type: 'button',
    content: string[],
  }
  type TextQuestion = {
    id: string,
    sentences: string[],
    type: 'text',
    content: null,
  }
  type NumericQuestion = {
    id: string,
    sentences: string[],
    type: 'numeric',
    content: null,
  }
  type EmailQuestion = {
    id: string,
    sentences: string[],
    type: 'email',
    content: null,
  }
  type PasswordQuestion = {
    id: string,
    sentences: string[],
    type: 'password',
    content: null,
  }
  type SelectQuestion = {
    id: string,
    sentences: string[],
    type: 'select',
    content: string[],
  }
  type RadioQuestion = {
    id: string,
    sentences: string[],
    type: 'radio',
    content: string[],
  }
  type Question = ButtonQuestion | TextQuestion | NumericQuestion
    | EmailQuestion | PasswordQuestion | SelectQuestion | RadioQuestion

  /* Answer Types */
  type TextAnswer = {
    questionId: string,
    value: string,
    sentence?: string
  }
  type NumericAnswer = {
    questionId: string,
    value: number,
    sentence?: string
  }
  type SelectAnswer = {
    questionId: string,
    value: string[],
    sentence?: string
  }
  type RadioAnswer = {
    questionId: string,
    value: string,
    sentence?: string
  }
  type Answer = TextAnswer | NumericAnswer | SelectAnswer | RadioAnswer
}
