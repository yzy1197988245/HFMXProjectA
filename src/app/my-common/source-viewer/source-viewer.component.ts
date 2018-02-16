import {
  AfterViewChecked, Component, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {SourceViewerService} from "../../services/source-viewer.service";
import {HttpService} from "../../services/http.service";
import * as Viewer from "viewerjs"
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DomSanitizer, SafeResourceUrl, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-source-viewer',
  templateUrl: './source-viewer.component.html',
  styleUrls: ['./source-viewer.component.scss'],
  //encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('transform', [
      state('hide', style({transform: 'translateY(-110%)'})),
      state('show', style({transform: 'translateY(0)'})),
      transition('* => show', [
        animate(200)
      ]),
      transition('* => hide', [
        animate(200),
      ])
    ]),
    trigger('backgroundTransform', [
      state('hide', style({opacity: 0})),
      state('show', style({opacity: 0.8})),
      transition('* => show', [
        animate(200)
      ]),
      transition('* => hide', [
        animate(200),
      ])
    ]),
    trigger('listItemState', [
      state('selected', style({'background-color': '#3f51b5', 'color': '#ffffff'})),
      state('mouseOver', style({ 'color': '#3f51b5'})),
      state('normal', style({ 'color': '#000000'})),
      transition('* => *', [
        animate(100)
      ]),
    ])
  ]
})
export class SourceViewerComponent implements OnInit,AfterViewChecked {

  currentSource;
  mouseOverSource;
  isShowBackground = false;
  baseUrl;

  imageView: Viewer;
  imagesrc;

  constructor(
    public sourceService: SourceViewerService,
    public dom: DomSanitizer
  ) {

  }

  ngOnInit() {
    this.baseUrl = HttpService.base_url + 'uploads/';
  }

  getSafeUrl():SafeResourceUrl {
    return this.dom.bypassSecurityTrustResourceUrl(HttpService.base_url + 'api/get-file?id=' + this.currentSource.id);
  }

  ngAfterViewChecked() {
    let image = document.getElementById('sourceImage');
    if (image) {
      if (image.getAttribute('src') == this.imagesrc)
        return;
      this.imagesrc = image.getAttribute('src');
      if (this.imageView) {
        this.imageView.update();
        // this.imageView = null;
      } else {
        this.imageView = new Viewer(image, {
          inline: true,
          button: false,
          navbar: false,
          title: false,
          transition:false,
          toolbar: {
            zoomIn: 1,
            zoomOut: 1,
            oneToOne: 1,
            reset: 1,
            prev: 0,
            play: {
              show: 0,
              size: 'large',
            },
            next: 0,
            rotateLeft: 1,
            rotateRight: 1,
            flipHorizontal: 1,
            flipVertical: 1,
          },
          keyboard: false
        });
      }
    } else {
      this.imagesrc = null;
      if (this.imageView) {
        this.imageView.destroy();
        this.imageView = null;
      }
    }
  }

  close():void {
    this.sourceService.hideSourceViewer();
  }

  onMouseOver(source): void {
    this.mouseOverSource = source;
  }

  getListState(source): string {
    if (source == this.currentSource) {
      return 'selected';
    } else if (source == this.mouseOverSource) {
      return 'mouseOver';
    } else {
      return 'normal'
    }
  }

  checkBackground(status): void {
    if (this.sourceService.sourceViewerStatus == 'show' && status == 'start') {
      this.isShowBackground = true;
    } else if (this.sourceService.sourceViewerStatus == 'hide' && status == 'done') {
      this.isShowBackground = false;
    }
    if (this.sourceService.sourceViewerStatus == 'show' && status == 'done') {
      this.currentSource = this.sourceService.sources[0];
    }
    if (this.sourceService.sourceViewerStatus == 'hide' && status == 'done') {
      this.currentSource = null;
    }
  }

  showSource(source): void {
    this.currentSource = source;
  }

  onError(errpr): void {
    console.log(errpr);
  }
}

