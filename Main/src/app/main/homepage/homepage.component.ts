import { Component, OnInit } from '@angular/core';
import { EmitterService } from '../../shared/services/emitter.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private title: Title, private seoService: SeoService) {
    this.title.setTitle('Shop App Online');
  }

  ngOnInit() {
    this.seoService.generateTags({
      type: 'website',
      title: 'Shop App Online',
      // tslint:disable-next-line:max-line-length
      description: 'Mua hàng tại hệ thống Shop App Online sẽ được bảo hành chính hãng, đảm bảo mọi quyền lợi của bạn',
      image: '../../../assets/images/636503731738133648_H1 Samsung Tet.png',
      slug: ''
    });
  }

}
