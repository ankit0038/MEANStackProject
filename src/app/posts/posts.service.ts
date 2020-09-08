import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';
@Injectable({
    providedIn: "root"
})
export class PostsService {
    private posts: Post[] = [];
    private postsUpdated = new Subject<Post[]>();

    getPosts() {
        return [...this.posts];             //creating a copy of original list posts and returnin the copy of that
    }

    getPostUpdatedListener() {
        return this.postsUpdated.asObservable();
    }

    addPost(title: string, content:string) {
        const post: Post = {
            title: title,
            content: content
        }
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
    }
} 