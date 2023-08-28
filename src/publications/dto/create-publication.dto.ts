import { IsDate, IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreatePublicationDto {
  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsNumber()
  mediaId: number;

  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsNumber()
  postId: number;

  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsDateString()
  date: Date;
}
