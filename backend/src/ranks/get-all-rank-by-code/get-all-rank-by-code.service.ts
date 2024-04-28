import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAllRankByCodeService {
	async execute( code: string ): Promise<Promise<any>> {
		return Promise.resolve( undefined )
	}
}
