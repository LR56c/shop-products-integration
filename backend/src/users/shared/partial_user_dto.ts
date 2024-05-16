import {PartialType} from "@nestjs/mapped-types";
import {UserDto} from "./user_dto";

export class PartialUserDto extends PartialType(UserDto) {}