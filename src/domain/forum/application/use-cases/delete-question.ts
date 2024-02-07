import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '../../enterprise/entities/question';
import { QuestionsRepository } from '../repositories/question-repository';

interface DeleteQuestionUseCaseRequest {
    authorId: string
    questionId: string
}

interface DeleteQuestionUseCaseResponse { }

export class DeleteQuestionUseCase {
    constructor(private questionRepository: QuestionsRepository) { }

    async execute({
        authorId,
        questionId
    }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)

        if (!question) {
            throw new Error('Question not found')
        }
        
        if (authorId !== question.authorId.toString()) {
            throw new Error('Not allowed.')
        }

        await this.questionRepository.delete(question)

        return {}
    }
}