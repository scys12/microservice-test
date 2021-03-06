import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async (enteredPassword) => {
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async (next) =>{
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt()
  this.password= await bcrypt.hash(this.password, salt)
})

const User = mongoose.model('User', userSchema)
export default User