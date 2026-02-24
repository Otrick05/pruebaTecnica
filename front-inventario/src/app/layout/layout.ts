import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LeftSide } from '../shared/components/left-side/left-side';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, LeftSide],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {

}
