import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class PartRequest {
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  article: string;
}
