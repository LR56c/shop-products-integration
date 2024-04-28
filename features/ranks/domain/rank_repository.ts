export abstract class RankRepository {
	abstract addRank(data: any): Promise<any>
	abstract getAllRankByCode(code: string): Promise<any>
}
