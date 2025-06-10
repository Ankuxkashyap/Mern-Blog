import mongoose from 'mongoose';

const { Schema } = mongoose;


const profile_imgs_collections_list = ['bottts']; 
const profile_imgs_name_list = ['ankit', 'john', 'jane']; 

const userSchema = new Schema(
  {
    personalInfo: {
      fullName: {
        type: String,
        lowercase: true,
        required: true,
        minlength: [3, 'Full name must be at least 3 letters'],
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        minlength: [3, 'Username must be at least 3 letters'],
        unique: true,
      },
      bio: {
        type: String,
        maxlength: [200, 'Bio should not be more than 200 characters'],
        default: '',
      },
      profile_img: {
        type: String,
        default: () =>
          `https://api.dicebear.com/6.x/${
            profile_imgs_collections_list[
              Math.floor(Math.random() * profile_imgs_collections_list.length)
            ]
          }/svg?seed=${
            profile_imgs_name_list[
              Math.floor(Math.random() * profile_imgs_name_list.length)
            ]
          }`,
      },
    },

    social_links: {
      youtube: { type: String, default: '' },
      instagram: { type: String, default: '' },
      facebook: { type: String, default: '' },
      twitter: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
    },

    account_info: {
      total_posts: { type: Number, default: 0 },
      total_reads: { type: Number, default: 0 },
    },

    blogs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        default: [],
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'joinedAt',
      updatedAt: 'updatedAt',
    },
  }
);

const User = mongoose.model('User', userSchema);
export default User;
