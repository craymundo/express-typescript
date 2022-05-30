import { model, Schema, Document} from 'mongoose'


export interface IQuiz extends Document {
    description: string;
    creationDate: Date;
  };
  
const quizSchema = new Schema<IQuiz>({
    idUser: {
        type: String,
        required: true
      },
      creationDate: {
        type: Date,
        default: Date.now
    },
    idQuestionnaire: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
      },
    questions: [
      {
        idQuestion: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        idAlternative:{
            type: String,
            required: true
        },
        descriptionAlternative: {
          type: String,
          required: true
        },
        isGood: {
            type: Boolean,
            required: true
        }
      }
    ]
})
  
  export default model<IQuiz>("Quiz", quizSchema);