import conf from "../conf/conf";
import { Client, Databases, ID, Storage, Query } from "appwrite";


export class Service{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)    
        this.bucket = new Storage(this.client)    
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteProjectId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status,
                        userId
                    }
            )
        } catch (error) {
            console.log("Service::createPost Error ", error);
            return false
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteProjectId,
                    slug,
                    {
                        title,
                        content,
                        featuredImage,
                        status
                    }
            )
        } catch (error) {
            console.log("Service::updatePost Error ", error);
            return false
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteProjectId,
                    slug
            )
        } catch (error) {
            console.log("Service::deletePost Error ", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteProjectId,
                    slug
            )
        } catch (error) {
            console.log("Service::getPost Error ", error);
            // return false
        }
    }

    async getPosts(queries = [Query.equal="status", "active"]){
        try {
            return await this.databases.listDocuments(
                    conf.appwriteDatabaseId,
                    conf.appwriteProjectId,
                    queries
            )
        } catch (error) {
            console.log("Service::getPost Error ", error);
            // return false
        }
    }

    // File services

    async uploadFile(file){
        try {
            return this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Service::uploadFile Error ", error);
            // return false
        }
    }

    async deleteFile(fileId){
        try {
            this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Service::deleteFile Error ", error);
            return false
        }
    }

    async getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Service::getFilePreview Error ", error);
            return false
        }
    }


}

const service = new Service()

export default service