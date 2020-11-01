import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    isLoading = false;
    totalPosts = 0;
    postsPerPage = 1;
    currentPage = 1;
    pageSizeOptions = [1,2,5,10];
    private postsSub: Subscription;

    constructor(private postsService: PostsService) {}

    ngOnInit() {
        this.isLoading = true;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
        this.postsSub = this.postsService.getPostUpdatedListener()
        .subscribe((postData: {posts: Post[], postCount: number}) => {
            this.isLoading = false;
            this.totalPosts = postData.postCount;
            this.posts = postData.posts;
        });
    }

    onChangedPage(pageData: PageEvent) {
        console.log(pageData);
        this.isLoading = true;
        this.currentPage = pageData.pageIndex + 1;
        this.postsPerPage = pageData.pageSize;
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
    }

    onDelete(postId: string) {
        this.isLoading = true;
        this.postsService.deletePost(postId).subscribe(() => {
            this.postsService.getPosts(this.postsPerPage, this.currentPage);
        });
    }

    ngOnDestroy() {
        this.postsSub.unsubscribe();
    }
} 