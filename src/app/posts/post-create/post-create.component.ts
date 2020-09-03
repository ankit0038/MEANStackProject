import { Component } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',

})
export class PostCreateComponent {

    newPost: string = '';

    onSavePost() {
        this.newPost = 'New Post Saved';
        console.log(this.newPost);
    }
} 