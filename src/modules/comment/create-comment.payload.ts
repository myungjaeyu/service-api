import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCommentPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  boardId: number;  
}
