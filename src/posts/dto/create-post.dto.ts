import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {

  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsString()
  title: string;

  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsString()
  text: string;
}
