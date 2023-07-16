import { Component } from '@angular/core';

// import shared components
import { HeaderComponent, FooterComponent,  } from 'src/app/shared';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent]
})
export class MainPageComponent {
  titleText = 'Things I’ve made trying to put my dent in the universe.';

  bodyText =
    'I’ve worked on tons of little projects over the years but these are the ones that I’m most proud of. Many of them are open-source, so if you see something that piques your interest, check out the code and contribute if you have ideas for how it can be improved.';
}
