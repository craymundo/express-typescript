import {Request, Response} from 'express'
import Quiz from "../models/quiz";

export const getAll = async (_req: Request, res: Response) => {
  const result = await Quiz.find().lean();
  return res.json({ data: result });
};

export const create = async (req: Request, res: Response) => {
  console.log('req.body:::', req.body)

  const newQuiz = new Quiz(req.body);
  await newQuiz.save();
  return res.status(201).json(newQuiz);
};

export const deleteQuiz = async (req: Request, res: Response) => {

  const { id } = req.params;
  const quizDeleted = await Quiz.findByIdAndDelete(id);
  if (!quizDeleted) return res.sendStatus(404);

  return res.sendStatus(204);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Quiz.findByIdAndUpdate(id, req.body);
  const quiz = await Quiz.findById(id).lean();
  return res.status(201).json(quiz);
};

export const findById= async (req: Request, res: Response) => {
  const { id } = req.params;
  const quiz = await Quiz.findById(id).lean();
  return res.status(201).json(quiz);
};