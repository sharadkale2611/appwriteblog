const env = import.meta.env
const conf = {
    appwriteUrl: String(env.VITE_APPWRITE_URL),
    appwriteProjectId: String(env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(env.VITE_APPWRITE_BUCKET_ID),
}
// there was a name issue with the import.meta.env.VITE_APPWRITE_URL, it was later fixed in debugging video

export default conf