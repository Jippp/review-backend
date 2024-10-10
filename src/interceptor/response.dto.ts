export class ResponseDto<T> {
	success: boolean
	data: T
	message: string
	status: number

	constructor(success: boolean, data: T, message: string, statusCode: number) {
		this.success = success
		this.data = data
		this.message = message
		this.status = statusCode
	}
}
