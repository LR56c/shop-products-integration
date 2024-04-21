import { NewsLetterRepository } from '../domain/repository/NewsLetterRepository'
import { Email } from '../../shared/domain/value_objects/Email';

export class NewsLetterSupabaseData implements NewsLetterRepository {
    add(email: Email): boolean {
        return true
    }
    check(email: Email): boolean {
        return true
    }
    remove(email: Email): boolean {
        return true
    }
    getAll(): Email[] {
        return []
    }

}
