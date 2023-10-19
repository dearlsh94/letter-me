export interface Letter {
  content: string,
  from: string
}

export interface LetterBox {
  name: string,
  salt: string,
  letters?: Letter[]
}

export interface CountSummary {
  letterBoxCount: number,
  letterCount: number
}