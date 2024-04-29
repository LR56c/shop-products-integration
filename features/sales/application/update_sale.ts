import { BaseException } from "../../shared/domain/exceptions/BaseException"
import { SaleRepository } from "../domain/repository/sale_repository"

export const UpdateSale = async (repo : SaleRepository, props : { 
    
}) : Promise<boolean> => {
    const errors : BaseException[] = []
    
    if ( errors.length > 0 ) {
        throw errors
    }
    
    return true
}