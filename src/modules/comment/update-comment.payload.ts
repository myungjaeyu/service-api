import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentPayload {
  @ApiProperty({
    required: false,
  })
  content: string;
}
