import { Request, Response } from 'express';

export default {
  async index(request: Request, response: Response) {
    try {
      return response.send({message: 'Hello world!'});
    } catch (error) {
      console.log(error);
      return response.status(500).send({message: 'Internal server error'});
    }
  }
};