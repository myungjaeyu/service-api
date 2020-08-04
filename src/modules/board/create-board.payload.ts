import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardPayload {
  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    required: true,
  })
  @IsNotEmpty()
  content: string;
}
