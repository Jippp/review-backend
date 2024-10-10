import {
	Injectable,
	NestInterceptor,
	ExecutionContext,
	CallHandler,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseDto } from './response.dto'

@Injectable()
export class ResponseInterceptor<T>
	implements NestInterceptor<T, ResponseDto<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<ResponseDto<T>> {
		return next.handle().pipe(
			map((data) => {
        if(data.errorStatus) {
          return new ResponseDto<T>(false, data.message, 'Request failed', data.errorStatus)
        }
				return new ResponseDto<T>(true, data, 'Request successful', 200)
			}),
		)
	}
}
