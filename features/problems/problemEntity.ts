export class ProblemEntity {
  id?: number;
  file?: string;
  constructor(
    public subject: string,
    public description: string,
    public photos: string[],
    public category: number
  ) {}
}

export class ProblemEntityDto {
  file?: string;
  constructor(
    public subject: string,
    public description: string,
    public imageUrl: string[],
    public category: Record<string, any>,
    public id?: number
  ) {}
}
