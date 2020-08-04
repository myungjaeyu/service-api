import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardPayload {
  @ApiProperty({
    required: false,
  })
  title: string;

  @ApiProperty({
    required: false,
  })
  content: string;
}
