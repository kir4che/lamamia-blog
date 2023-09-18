import mongoose from 'mongoose'

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL as string)
	} catch (err) {
		throw new Error('Connection failed!')
	}
}

export default connect
