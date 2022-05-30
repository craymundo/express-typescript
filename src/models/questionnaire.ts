import { model, Schema, Document} from 'mongoose'


export interface IQuestionnaire extends Document {
    description: string;
    creationDate: Date;
  };
  
const questionnaireSchema = new Schema<IQuestionnaire>({
    description: {
        type: String,
        required: true
      },
      creationDate: {
        type: Date,
        default: Date.now
    },
    questions: [
      {
        description: {
          type: String,
          required: true
        },
        alternatives: [
            {
                text: {
                    type: String,
                    required: true
                },
                isCorrect: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            }
        ]
      }
    ]
})
  
  export default model<IQuestionnaire>("Questionnaire", questionnaireSchema);