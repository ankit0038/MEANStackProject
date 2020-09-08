import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription }from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
    // posts = [
    //     {title: 'First Post', content: 'First Post Content'},
    //     {title: 'Second Post', content: 'Second Post Content'},
    //     {title: 'Third Post', content: 'Third Post Content'},
    //     {title: 'Fourth Post', content: 'Fourth Post Content'}
    // ]

    posts: Post[] = [];
    private postsSub: Subscription;

    constructor(private postsService: PostsService) {}

    ngOnInit() {
        this.posts = this.postsService.getPosts();
        this.postsSub = this.postsService.getPostUpdatedListener().subscribe((posts: Post[]) => {
            this.posts = posts;
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
} 