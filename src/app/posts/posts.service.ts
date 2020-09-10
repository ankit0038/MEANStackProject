import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';
@Injectable({
    providedIn: "root"
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();


    constructor(private httpClient: HttpClient) {}

    getPosts() {
        this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
        .pipe(map((postData) => {
            return postData.posts.map(post => {
                return {
                    title: post.title,
                    content: post.content,
                    id: post._id
                };
            });
        }))
        .subscribe((transformedPosts) => {
            this.posts = transformedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }

    getPostUpdatedListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content:string) {
        const post: Post = {
            id: null,
            title: title,
            content: content
        }
        this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
        .subscribe((responseData) => {
            //console.log(responseData.message);
            const id = responseData.postId;
            post.id = id;
            this.posts.push(post);
            this.postsUpdated.next([...this.posts]);
        });
    }

    deletePost(id: string) {
        this.httpClient.delete("http://localhost:3000/api/posts/"+id)
        .subscribe(() => {
            //console.log("Post Deleted");
            const updatedPosts = this.posts.filter(post => post.id !== id);
            this.posts = updatedPosts;
            this.postsUpdated.next([...this.posts]);
        });
    }
} 