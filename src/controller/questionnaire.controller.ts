import {Request, Response} from 'express'
import Questionnaire from "../models/questionnaire";

export const getAll = async (_req: Request, res: Response) => {
  const result = await Questionnaire.find().lean();
  return res.json({ data: result });
};

export const create = async (req: Request, res: Response) => {
  if (!req.body.description) {
    return res
      .status(400)
      .json({ msg: "Please. Send your user and password" });
  }

  const newQuestionnaire = new Questionnaire(req.body);
  await newQuestionnaire.save();
  return res.status(201).json(newQuestionnaire);
};

export const deleteQuestionnaire = async (req: Request, res: Response) => {

  const { id } = req.params;
  const questionnaireDeleted = await Questionnaire.findByIdAndDelete(id);
  if (!questionnaireDeleted) return res.sendStatus(404);

  return res.sendStatus(204);
};

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  await Questionnaire.findByIdAndUpdate(id, req.body);
  const questionnaire = await Questionnaire.findById(id).lean();
  return res.status(201).json(questionnaire);
};

export const findById= async (req: Request, res: Response) => {
  const { id } = req.params;
  const questionnaire = await Questionnaire.findById(id).lean();
  return res.status(201).json(questionnaire);
};