import { IsNotEmpty, IsString } from "class-validator";

export class CreateMediaDto {
  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsString()
  title: string;

  @IsNotEmpty({
    message: 'All field are required'
  })
  @IsString()
  username: string;
}
