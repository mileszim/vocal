import Vocal from '../Vocal'
import * as userPermissionsUtils from '@untemps/user-permissions-utils'

describe('Vocal', () => {
	it('throws error when setting isSupported explicitly', () => {
		expect(() => (Vocal.isSupported = false)).toThrow()
	})

	it('throws error when setting instance explicitly', () => {
		const wrapper = new Vocal()
		expect(() => (wrapper.instance = null)).toThrow()
	})

	it('throws error when getUserMediaStream returns false value', async () => {
		const onError = jest.fn()
		jest.spyOn(userPermissionsUtils, 'getUserMediaStream').mockResolvedValueOnce(null)
		const wrapper = new Vocal()
		wrapper.addEventListener('error', onError)
		await wrapper.start()
		expect(onError).toHaveBeenCalledWith(new Error('Unable to retrieve the stream from media device'))
	})

	it('throws error when getUserMediaStream throws', async () => {
		const onError = jest.fn()
		const error = new Error('foo')
		jest.spyOn(userPermissionsUtils, 'getUserMediaStream').mockImplementationOnce(() => {
			throw error
		})
		const wrapper = new Vocal()
		wrapper.addEventListener('error', onError)
		await wrapper.start()
		expect(onError).toHaveBeenCalledWith(error)
	})
})
