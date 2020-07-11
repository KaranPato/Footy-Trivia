export class Questions {
    id: string;
    question: string;
    opt1: string;
    opt2: string;
    opt3: string;
    opt4: string;
}

export class QuestionsResponse{
    status: number;
    response: Questions[];
}
