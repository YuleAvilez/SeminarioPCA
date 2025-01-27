import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],  
  standalone: false,
})
export class HomePage {
  posts: any;
  constructor(
    private postService: PostService
  ) {}

  ngOnInit(){
    console.log('home page');
    this.postService.getPosts().then((data: any) =>{
      console.log(data);
      this.posts = data;
    })
  }

}